const mongoose = require('mongoose')

const config  = require('../../config')
const Mentor  = require('../../models/mentorModel')
const Student  = require('../../models/studentModel')

const mentorGet = async _id => {
    try {
        const mentor = await Mentor.findById(_id).populate('ex')

        return {
            ok: true,
            data: mentor
        }
    } catch (err) {
        config.logger.error(err)
        return {
            ok: false,
            data: err
        }
    }
}

module.exports = mentorGet