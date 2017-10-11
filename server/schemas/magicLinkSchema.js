const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    email: mongoose.SchemaTypes.Email,
    type: {
        type: String,
        enum: ['mentor', 'student', 'admin'],
    },
    token: {
        type: String,
        unique: true,
        index: true,
    },
})

module.exports = studentSchema