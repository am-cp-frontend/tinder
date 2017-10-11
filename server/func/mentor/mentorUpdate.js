const mongoose = require('mongoose')

const config  = require('../../config')
const Mentor  = require('../../models/mentorModel')
const mentorGet = require('./mentorGet')

const mentorUpdate = async (_id, patch) => {
    const mentor = mentorGet(_id)

    try {
        Object.assign(mentor, patch)
        await mentor.save()

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

module.exports = mentorUpdate