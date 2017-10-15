const config  = require('../config')

const mentorScraper = require('../scrapers/mentors')
const studentScraper = require('../scrapers/students')

const mentorAdd = require('./mentor/mentorAdd')
const mentorUpdate = require('./mentor/mentorUpdate')
const studentAdd = require('./student/studentAdd')

const Mentor  = require('../models/mentorModel')
const Student  = require('../models/studentModel')

const logger = config.logger


const mentors = async () => {
    logger.log('Collecting mentor links')
    const mentorLinks = await mentorScraper.fetchMentorLinks()

    logger.log('Fetching mentor data')
    const mentorData = await Promise.all(mentorLinks.map(mentorScraper.fetchMentorData))

    const mentorAddPromises = mentorData
                                .filter(mentor => mentor.mainEmail)
                                .map(mentorAdd)

    logger.log('Filling database')
    const dbAddResuts = await Promise.all(mentorAddPromises)

    logger.log('Collecting errors')
    const errors = dbAddResuts.filter(res => !res.ok)

    logger.log('Done')
    return errors
}


const students = async () => {
    logger.log('Fetching mentor-student data')
    const mentorStudentData = await studentScraper.fetchMentorStudentData()

    const occuredStudentContacts = new Set([])
    const students = mentorStudentData.reduce((oldVal, data) => {
        const newStudents = data.students.filter(student =>
                                !occuredStudentContacts.has(student.contacts[0]))
        
        occuredStudentContacts.add(...newStudents.map(s => s.contacts[0]))    

        return oldVal.concat(newStudents)
    }, [])

    logger.log(students)

    logger.log('Filling database')
    const dbAddResuts = await Promise.all(students.map(studentAdd))

    logger.log('Collecting errors')
    const errors = dbAddResuts.filter(res => !res.ok)

    logger.log('Done')
    return errors
}


const addStudentsToMentor = async exData => {
    const mentor = await Mentor.findOne({name: exData.mentorName})
    const students =  await Student.where('name').in(exData.students.map(s => s.name))

    if(mentor === null)
        return {
            ok: false, 
            data: {
                error: 'Mentor not founld ' + exData.mentorName,
                input: exData
        
            }
        }   

    const newEx = students.map(student => student._id)
    const patch = {ex: newEx}

    const updateResult = await mentorUpdate(mentor._id, patch)

    return {ok: true}
}

const mentorExs = async () => {
    logger.log('Fetching mentor-student data')
    const mentorStudentData = await studentScraper.fetchMentorStudentData()

    logger.log('Updating database')
    const dbUpdateResuts = await Promise.all(mentorStudentData.map(addStudentsToMentor))

    logger.log('Collecting errors')
    const errors = dbUpdateResuts.filter(res => !res.ok)
    
    logger.log('Done')
    return errors
}


module.exports = {
    mentors,
    students,
    mentorExs
}