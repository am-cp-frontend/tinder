const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    email: mongoose.SchemaTypes.Email,
    contact: String,
    type: {
        type: String,
        enum: ['mentor', 'student', 'admin'],
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        index: true,
    },
    token: {
        type: String,
        unique: true,
        index: true,
    },
})

module.exports = studentSchema