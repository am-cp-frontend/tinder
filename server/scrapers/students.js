const fse = require('fs-extra')
const { JSDOM } = require('jsdom')

const config = require('../config')

const logger = config.logger

const STUDENTS_URL      = 'http://pm-pu.ru/wiki-stuff/supervisor'
const RESULTS_DIR       = __dirname + '/results'
const STUDENT_DATA_FILE = RESULTS_DIR + '/students.json'


const setup = async () => {
    await fse.ensureDir(RESULTS_DIR)
    
    await fse.remove(STUDENT_DATA_FILE)
}


const parseCellPair = $cellPair => {
    const mentorName = $cellPair[0].textContent.trim()
    const $studentLiks = Array.from($cellPair[1].querySelectorAll('a'))

    if($studentLiks.length === 0) return {ok: false}

    const students = $studentLiks.map($link => {
        const linkValue = $link.getAttribute('href')
        const vkContact = linkValue.replace(/https?:\/\//, '').trim()

        return {
            name: $link.textContent.trim(),
            contacts: [vkContact]
        } 
    })

    return {
        ok: true,
        data: { mentorName, students }
    }
}

const fetchMentorStudentData = async () =>  {
    const dom = await JSDOM.fromURL(STUDENTS_URL)
    const document = dom.window.document

    const $rows = Array.from(document.querySelector('table').querySelectorAll('tr'))

    const mentorStudentData = $rows.reduce((data, $row) => {
        let cellPair, parseResult 
        
        for(let i = 0; i < $row.children.length; i += 2) {
            cellPair = [$row.children[i], $row.children[i + 1]]
            parseResult = parseCellPair(cellPair)

            if(parseResult.ok) data.push(parseResult.data)
        }

        return data
    }, [])

    return mentorStudentData
} 

const collect = async () => {
    logger.log('Preparing to collect mentors`s students data')
    await setup()

    logger.log('Collecting student links')

    const mentorStudentData = await fetchMentorStudentData()
    

    logger.log('Writing mentors`s students data')
    await fse.writeJson(STUDENT_DATA_FILE, mentorStudentData, collect)

    logger.log('Done')
}

module.exports = {fetchMentorStudentData}