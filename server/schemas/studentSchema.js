const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: String,
    contacts: [String],
    mentor_ids: {
        type: [String],
        index: true,
    },
})

module.exports = studentSchema