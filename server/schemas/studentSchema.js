const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: String,
    contacts: [String],
})

module.exports = studentSchema