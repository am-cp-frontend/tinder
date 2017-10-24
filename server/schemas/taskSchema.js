const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: String,
    desc: String,
    skills: String,
    attachments: [{
        title: String,
        link: String
    }]
})

module.exports = taskSchema