const mongoose = require('mongoose'); mongoose.Promise = global.Promise
const m = require('./mentor/mentorQuery')

m({}).then(console.log).catch(console.error)
