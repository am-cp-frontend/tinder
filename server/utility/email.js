const nodemailer = require('nodemailer')

const config = require('../config')

const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
})


const emailDefault = {
    from: '"СНО" <sci@v-trof.ru>'
}

const magicLinkTemplate = (token, name) => {
    const link = `https://${config.appHost}/auth/magic/${token}`

    return {
        text: `
            ${name}, Ваша ссылка для входа в приложение для поиска учеников
            ${link}
            
            ------------

            amcp.sci@spbu.ru Почта СНО, для вопросов и пожеланий
        `,
        html: `
            <div style="font-size: 16px;font-family: 'Roboto', 'Arial', sans-serif;">
            <h1> Вход в приложение для поиска учеников </h1>
            Здравствуйте, ${name}. Вы можете войти просто нажав на эту кнопку.
            <div>
            <a href="${link}" style="color: #212121;"> 
                <div style="padding: 10px 25px; background: #eee; margin: 20px 0; display: inline-block;"> 
                    Войти
                </div> 
            </a>
            </div>
            </div>
            Если она не работает, скопируйте ссылку <br />
            <a href="${link}">${link}</a> <br/>
            В адресную строку вашего браузера

            <hr />
            amcp.sci@spbu.ru Почта СНО, для вопросов и пожеланий
        `
    }
}

const sendEmail = message => new Promise((resolve, reject) => {
    const finalMessage = Object.assign({}, emailDefault, message)
    console.log(message)
    // resolve()
    
    transporter.sendMail(finalMessage, (err, data) => {
        if(err) reject({ok: false, data: err})
        console.log('sent fine')
        resolve({ok: true, data})
    })
})

module.exports = {
    send: sendEmail,
    template: {
        magicLink: magicLinkTemplate 
    }
}