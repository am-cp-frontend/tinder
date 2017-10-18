const setup = require('../setup/index')
const fillFromScrapers = require('./fillFromScrapers')

setup()
    .then(fillFromScrapers.students)
    .then(fillFromScrapers.mentorExs)
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err)
        process.exit(1)
    })