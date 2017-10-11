const mongoose = require('mongoose')

const config  = require('../../config')
const Mentor  = require('../../models/mentorModel')

const mentorQuery = async () => {
    try {
        const mentors = await Mentor.find({})

        return {
            ok: true,
            data: mentors
        }
    } catch (err) {
        return {
            ok: false,
            data: err
        }
    }
}

module.exports = mentorQuery