const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
});

module.exports = transporter.sendMail