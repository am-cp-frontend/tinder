const Router = require('koa-router')
const send = require('koa-send')

const config = require('../config')
const mentorAdd = require('../func/mentor/mentorAdd')

const utilityRouter = new Router() 

utilityRouter
    .get('/', (ctx, next) => {
        ctx.body = `utils router`
    })
    .post('/start/', (ctx, next) => {
        ctx.body = `utils login`
    })
    .get('/mentor/add/', async (ctx, next) => {
        await send(ctx, config.path.forms + '/mentorAdd.html', { root: config.path.root })
    })
    .post('/mentor/add/', async (ctx, next) => {
        const mentor = {}
        mentor.name = ctx.request.body.name
        mentor.mainEmail = ctx.request.body.email
        
        const result = await mentorAdd(mentor)
        
        // Returned UI
        ctx.body = '<!Doctype html>'

        if(result.ok) ctx.body += 'Добавлен'
        else ctx.body += result.data

        ctx.body += '<br> <a href=""> Добивить еще </a>'
    })
    .post('/student/add/', (ctx, next) => {
        ctx.body = 'utils add student'
    })

module.exports = utilityRouter