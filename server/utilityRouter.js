const Router = require('koa-router')
const utilityRouter = new Router() 

utilityRouter
    .get('/', (ctx, next) => {
        ctx.body = `utils router`
    })
    .post('/start/', (ctx, next) => {
        ctx.body = `utils login`
    })
    .post('/add-mentor/', (ctx, next) => {
        ctx.body = 'utils add mentor'
    })
    .post('/add-student/', (ctx, next) => {
        ctx.body = 'utils add student'
    })

module.exports = utilityRouter