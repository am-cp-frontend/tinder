const mongoose = require('mongoose')

const mentorSchema = require('../schemas/mentorSchema')

const Mentor = mongoose.model('Mentor', mentorSchema)

module.exports = Mentor