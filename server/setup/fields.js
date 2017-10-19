const fse = require('fs-extra')

const fields = []
const Mentor = require('../models/mentorModel')

const prepare = async (logger, fieldsFile) => {
    logger.log('ensuring fields file')
    await fse.ensureFile(fieldsFile)
}

const refill = async (logger, fieldsFile) => {
    logger.log('fetching known fields from db')
    const mentors = await Mentor.find({fields: {$not: {$size: 0}}})
    
    const mentorFields = mentors.reduce((oldVal, mentor) => {
        mentor.fields.forEach(f => oldVal.add(f))
        return oldVal
    }, new Set([]))
    
    logger.log('fetching preset fields from file')
    const presetFieldsString = await fse.readFile(fieldsFile, 'utf8')
    const presetFields = presetFieldsString.split('\n').map(s => s.trim()).filter(s => s.length)
    
    const combinedFields = new Set([...mentorFields, ...presetFields])
    
    logger.log('refilling fields')
    console.log([...combinedFields])
    fields.length = 0
    combinedFields.forEach(field => fields.push(field))
}

module.exports = {
    list: fields,
    refill,
    prepare,
    execute: refill
}