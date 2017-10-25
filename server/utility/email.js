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

const magicLinkTemplate = (token, name, ) => {
    const link = `https://${config.appHost}/auth/magic/${token}`
    const declineLink = `https://${config.appHost}/auth/decline/${token}`

    return {
        html: `
            <div style="font-size: 16px;font-family: 'Roboto', 'Arial', sans-serif;">
                <h1> Поиск учеников для научного руководства [Веб сервис] </h1>
                <p>
                    Здравствуйте, ${name}!
                    Студенческое научной общества факультета ПМ-ПУ проанализировало ситуацию 
                    с поиском научных руководителей студентами факультета.
                    Многие из них сталкивались или сталкнулись в данных момент с проблемой 
                    отсутствия информации о тех задачах, которыми занимаются преподаватели факультета. 
                </p>
                <p>
                    Чтобы хоть как-то им помочь, мы разарботали специальный сервис,
                    который позволит преподавателю найти себе учеников,
                    а студентам определиться с выбором научного руководителя. 
                    ${name.split(' ').slice(1).join(' ')}, пожалуйста,
                    просим Вас откликнуться на нашу просьбу и заполнить информацию о ваших 
                    научных интересах и задачах. Это займёт не более 7 минут вашего времени. 
                </p>
                <div>
                Чтобы приступить к заполнению информации просто нажмите на эту кнопку.
                    <div>
                        <a href="${link}" style="color: #212121; display: block"> 
                            <div style="padding: 10px 25px; background: #eee;"> 
                                Войти
                            </div> 
                        </a>
                        <a href="${declineLink}" style="color: #212121; display: block">
                            <div style="padding: 10px 25px; background: #eee;"> 
                                Не набираю учеников в этом году
                            </div> 
                        </a>
                    </div>
                </div>
            </div>
            Если кнопка не работает, пожалуйста, скопируйте ссылку           <br />
            Для входа:         <a href="${link}">        ${link}        </a> <br />
            Если не набираете: <a href="${declineLink}"> ${declineLink} </a> <br />
            В адресную строку вашего браузерач

            <hr />
            Вопросы и предложения по работе сервиса вы можете направлять на
            почту Студенческого научного общества факультета ПМ-ПУ: amcp.sci@spbu.ru
        `
    }
}

const sendEmail = message => new Promise((resolve, reject) => {
    const finalMessage = Object.assign({}, emailDefault, message)
    // resolve()
    
    config.logger.log('sending email to', message.to)
    transporter.sendMail(finalMessage, (err, data) => {
        if(err) reject({ok: false, data: err})
        config.logger.log('email sent to', message.to)
        resolve({ok: true, data})
    })
})

module.exports = {
    send: sendEmail,
    template: {
        magicLink: magicLinkTemplate 
    }
}