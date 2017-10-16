const config = require('./config')
const setup = require('./setup/index')

const magicLinkGenerate = require('./func/magicLink/magicLinkGenerate')
const mentorQuery = require('./func/mentor/mentorQuery')

setup()
    .then(mentorQuery)
    .then(res => magicLinkGenerate('mentor', res.data[0]))
    .then(res => {
        if(!res.ok) return console.error(res.data)

        const nodemailer = require('nodemailer')
        
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        nodemailer.createTestAccount((err, account) => {
        
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'ce6zlnttixzmb6oa@ethereal.email',
                    pass: 'ZTfYEPrwwKJgr1snm3'
                }
            })
        
            const link = `http://${config.appHost}:${config.appPort}/auth/${res.data.token}`

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Apmath Tinder" <foo@blurdybloop.com>', 
                to: res.data.email,
                subject: 'Ссылка для входа',
                text: 'Ссылка для входа:' + link,
                html: `
                        <h1> Сслка для входа </h1> 
                        <a href='${link}'>${link}</a>
                      `
            }
        
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            })
        })
        
    })