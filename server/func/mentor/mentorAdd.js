const mongoose = require('mongoose'); mongoose.Promise = global.Promise
const koad = 

const config = require('./config')
const Mentor = require('./models/mentorModel')
const Student = require('./models/studentModel')

mongoose.connect(config.mongoURL, { useMongoClient: true })