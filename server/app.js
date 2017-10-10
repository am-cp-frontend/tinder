const mongoose = require('mongoose'); mongoose.Promise = global.Promise

const config = require('./config')
const Mentor = require('./models/mentorModel')
const Student = require('./models/studentModel')

mongoose.connect(config.mongoURL, { useMongoClient: true })

const Jakushken = new Mentor({
    name: 'Oleg Jakushkin',
    contacts: ['room 447', 'mrj@sbpu.ru'],
    fields: ['clusters'],
    acceptsOwn: 'inField',
    mainEmail: 'mrj@sbpu.ru'
})

const run = async () => {
    try {
        await Jakushken.save()
    } catch(err) {
        console.error(err)
    }
    

    await Mentor.find({}, (err, mentors) => {
        console.error('metors:', mentors)
    })
}

run()