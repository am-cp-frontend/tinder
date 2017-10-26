const config  = require('../../config')
const Mentor  = require('../../models/mentorModel')

const defaultQuery = {
    $or: [
        {acceptsOwn: 'any'},
        {fields: {$not: {$size: 0}}}
    ]
}

const mentorQuery = async query => {
    try {
        const mentors = await Mentor.find(query || defaultQuery).exec()
        return {
            ok: true,
            data: mentors
        }
    } catch (err) {
        config.logger.error(err)
        return {
            ok: false,
            data: err
        }
    }
}

module.exports = mentorQuery