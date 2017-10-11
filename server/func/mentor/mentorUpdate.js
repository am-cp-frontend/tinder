const mongoose = require('mongoose')

const config  = require('../../config')
const Mentor  = require('../../models/mentorModel')
const mentorGet = require('./mentorGet')
const makePatchSafe = require('../../utility/makePatchSafe')

const mentorUpdate = async (_id, patch) => {
    const result = await mentorGet(_id)
    if( ! result.ok) return result

    patch = makePatchSafe(patch)
    const mentor = result.data
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