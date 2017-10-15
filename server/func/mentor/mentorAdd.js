const mongoose = require('mongoose')

const config  = require('../../config')
const Mentor  = require('../../models/mentorModel')

const mentorAdd = async mentorData => {
    config.logger.log('Adding new mentor', mentorData.name)

    const newMentor = new Mentor(mentorData)
    if(newMentor.contacts.length === 0) newMentor.contacts.push(newMentor.mainEmail)

    try {
        await newMentor.save()
    } catch (err) {
        config.logger.error(err)
        return {
            ok: false,
            data: err
        }
    }

    return {
        ok: true,
        data: newMentor._id
    }
}

module.exports = mentorAdd