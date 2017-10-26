const mongoose = require('mongoose'); mongoose.Promise = global.Promise
const setup = require('../setup/index')

const email = require('../utility/email')
const mentorQuery = require('./mentor/mentorQuery')
const magicLinkGenerate = require('./magicLink/magicLinkGenerate')

const sendMagic = async mentor => {
  const magicLinkResult = await magicLinkGenerate('mentor', mentor)
  if(magicLinkResult.ok) {
    const emailContent = email.template.magicLink(
        magicLinkResult.data.token,
        mentor.name
    )
    const emailRes = await email.send(Object.assign({
        to: mentor.mainEmail,
        subject: 'Поиск учеников для научного руководства'
    }, emailContent))

    return emailRes
  } else {
    return magicLinkResult
  }
}

const start = async () => {
  const mentorResults = await mentorQuery({fields: {$size: 0}}) 
  const emailRes = await Promise.all(mentorResults.data.map(sendMagic))
  
  console.log(emailRes.filter(e => !e.ok))
  
  process.exit()
}

setup()
  .then(d => start())
