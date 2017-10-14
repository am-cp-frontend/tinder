const fse = require('fs-extra')
const { JSDOM } = require('jsdom')

const config = require('../config')

const logger = config.logger

const APMATH_MENTORS_URL = 'http://www.apmath.spbu.ru/ru/staff'
const RESULTS_DIR        = __dirname + '/results'
const MENTOR_DATA_DIR    = RESULTS_DIR + '/mentors'
const MENTOR_LINKS_FILE  = RESULTS_DIR + '/mentorLinks.txt'


const setup = async () => {
    await fse.ensureDir(RESULTS_DIR)
    
    await fse.remove(MENTOR_LINKS_FILE)
    await fse.remove(MENTOR_DATA_DIR)

    await fse.ensureDir(MENTOR_DATA_DIR)
}


const composeMentorLink = mentorSubLink => `${APMATH_MENTORS_URL}/${mentorSubLink}index.html`
const composeMentorFileName = mentorData => `${MENTOR_DATA_DIR}/${mentorData.name}.json` 
const capitalize = str => str[0].toUpperCase() + str.slice(1).toLowerCase()


const fetchMentorLinks = async () => {
    const dom = await JSDOM.fromURL(APMATH_MENTORS_URL)
    const document = dom.window.document

    const $mentorLinks = Array.from(document.querySelectorAll('#content table td:first-child a'))
    
    const mentorLinks = $mentorLinks.map($a =>  composeMentorLink($a.getAttribute('href')))

    return mentorLinks
}


const fetchMentorData = async mentorUrl => {
    const mentorData = {}
    
    const dom = await JSDOM.fromURL(mentorUrl)
    const document = dom.window.document
    
    const mentorNameSplit = document.querySelector('h1').textContent.split(' ')
    mentorData.name = [capitalize(mentorNameSplit[0]), ...mentorNameSplit.slice(1)].join(' ') 
    
    const $personalInfo = document.querySelector('.pinfo')
    const personalInfoText = $personalInfo.textContent
    
    const postEmailString = personalInfoText.split('E-mail:')[1]

    if(postEmailString) {
        const emailCores = postEmailString.split('@')
        const emails = postEmailString.split(' ').slice(1, emailCores.length)
                            .map(substr => substr.replace(/[,;]/g, ''))

        mentorData.contacts = emails
        mentorData.mainEmail = emails[0]

    } else {
        // logger.warn(`${mentorData.name} has no email`)
        mentorData.contacts = []
        mentorData.mainEmail = false
    }

    const postRoomString = personalInfoText.split('Комн.')[1]
    if(postRoomString) {
        const roomNumberLine = postRoomString.replace(' к.', '').match(/[0-9, ]+/)

        const roomNumbers = roomNumberLine[0].split(',').map(s => s.trim()).filter(s => s.length)
        mentorData.contacts = [...mentorData.contacts, ...roomNumbers.map(s => 'Каб. ' + s)]
    }


    return mentorData
}


const collect = async () => {
    logger.log('Preparing to collect mentor data')
    await setup()

    logger.log('Collecting mentor links')
    const mentorsLinks = await fetchMentorLinks()
    
    logger.log('Writing mentor links')
    await fse.writeFile(MENTOR_LINKS_FILE, mentorsLinks.join('\n'))
    
    logger.log('Fetching mentor data')
    const mentorsData = await Promise.all(mentorsLinks.map(fetchMentorData))

    logger.log('Writing mentor data')
    const writeResults = await Promise.all(mentorsData.map(async data => {
        try {
            await fse.writeJson(composeMentorFileName(data), data) 
            return {ok: true}
        } catch (err) {
            logger.error(err)
            return {ok: false, error: err}
        }
    }))

    logger.log('Collecting errors')
    const errors = writeResults.filter(res => !res.ok).map(res => res.error)

    return {ok: errors.length === 0, errors}
}

module.exports = {fetchMentorLinks, fetchMentorData, collect}