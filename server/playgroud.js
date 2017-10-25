const collectMentors = require('./scrapers/mentors').collect

const setup = require('./setup/index')
const fillFromScrapers = require('./func/fillFromScrapers')

setup()
    .then(fillFromScrapers.mentors)

// collectMentors()