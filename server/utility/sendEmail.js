const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
})

const emailTemplate = {
    from: '"Apmath Tinder" <seva.trofimov2@gmail.com>'
}

const sendEmail = message => new Promise((resolve, reject) => {
    const finalMessage = Object.assign({}, emailTemplate, message)
    console.log(message)
    resolve()
    
    // transporter.sendMail(finalMessage, (err, data) => {
    //     if(err) reject({ok: false, data: err})
    //     resolve({ok: true, data})
    // })
})

module.exports = sendEmail