const mongoose = require('mongoose')

const config  = require('../../config')
const Student  = require('../../models/studentModel')

const studentAdd = async studentData => {
    config.logger.log('Adding new student', studentData.name)
    const newStudent = new Student(studentData)

    try {
        await newStudent.save()
    } catch (err) {
        config.logger.error(err)
        return {
            ok: false,
            data: err
        }
    }

    return {
        ok: true,
        data: studentData._id
    }
}

module.exports = studentAdd