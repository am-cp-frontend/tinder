const config = require('./config')
const setup = require('./setup/index')

const fillFromScrapers = require('./func/fillFromScrapers')


setup()
    // .then(() => fillFromScrapers.mentors())
    // .then(errors => errors.map(res => console.error(res.data.error)))

    .then(() => fillFromScrapers.students())
    .then(errors => errors.map(res => console.error(res.data.error)))
    
    .then(() => fillFromScrapers.mentorExs())
    .then(errors => errors.map(res => console.error(res.data.error)))
    .catch(wtf => console.error('wtf', wtf))