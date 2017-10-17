const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const serve = require('koa-static')

const config = require('./config')
const setup = require('./setup/index')
const router = require('./routers/index')
const setHeaders = require('./utility/setHeaders')

const logger = config.logger
const app = new Koa()
app.keys = ['Secret?']


setup().then(() => {
    logger.log('listening on port:', config.appPort)
    app.listen(config.appPort)
})

app.use(session(config.session, app))

app.use(bodyParser())
app.use(setHeaders())

// logger
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    logger.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.use(serve('./dist', {
    index: 'none',
    maxage: 31536000
}))

app.use(serve('./static', {
    maxage: 31536000
}))

app
    .use(router.routes())
    .use(router.allowedMethods())