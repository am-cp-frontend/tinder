const Router = require('koa-router')

const appRouter = require('./appRouter')
const utilityRouter = require('./utilityRouter')

const fullRouter = new Router()

fullRouter.use('/utility', utilityRouter.routes(), utilityRouter.allowedMethods())
fullRouter.use('', appRouter.routes(), appRouter.allowedMethods())

module.exports = fullRouter