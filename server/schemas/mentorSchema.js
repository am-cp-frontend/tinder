const mongoose = require('mongoose')
require('mongoose-type-email')

const studentSchema = require('./studentSchema')
const taskSchema = require('./taskSchema')

const mentorSchema = new mongoose.Schema({
    name: String,
    contacts: [String],
    
    fields: {
        type: [String],
        index: true,
    },
    
    acceptsOwn: {
        type: String, 
        enum: ['none', 'any', 'inField'],
        default: 'none',
        index: true,
    },
    
    tasks: [taskSchema],
    ex: [studentSchema],

    //db-utils
    mainEmail: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        index: true,
    },
})

module.exports = mentorSchema