const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: String,
    desc: String,
    skills: String,
})

module.exports = taskSchema