const Koa = require('koa')
const Router = require('koa-router')

const config = require('./config')
const setup = require('./setup/index')
const utilityRouter = require('./utilityRouter')

const logger = config.logger
const app = new Koa()
const router = new Router()

setup().then(() => {
    logger.log('listening on port:', config.appPort)
    app.listen(config.appPort)
})


router
    .get('/auth/:token/', async (ctx, next) => {
        ctx.body = `auth or not w/ ${ctx.params.token} \n`
        
        await next()
    })
    .get('/data/mentors/', async (ctx, next) => {
        ctx.body = 'mentorlsit'
    })
    .get('/data/mentor/:id/', (ctx, next) => {
        ctx.body = `mentor id: ${ctx.params.id}`
    })
    .post('/update/mentor/:id/', (ctx, next) => {
        
    })

router.use('/utility', utilityRouter.routes(), utilityRouter.allowedMethods())

router.get('*', (ctx, next) => {
    ctx.body = ctx.body || ''

    ctx.body += 'spa'
})


// logger
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    logger.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app
    .use(router.routes())
    .use(router.allowedMethods())