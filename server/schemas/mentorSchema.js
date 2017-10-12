const mongoose = require('mongoose')
require('mongoose-type-email')

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
    ex: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],

    //db-utils
    mainEmail: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        index: true,
    },
})

module.exports = mentorSchema