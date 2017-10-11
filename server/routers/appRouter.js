const Router = require('koa-router')
const appRouter = new Router() 

const config = require('../config')
const mentorGet = require('../func/mentor/mentorGet')
const mentorQuery = require('../func/mentor/mentorQuery')
const mentorUpdate = require('../func/mentor/mentorUpdate')

appRouter
    .get('/auth/:token', async (ctx, next) => {
        ctx.body = `auth or not w/ ${ctx.params.token} \n`
        
        await next()
    })
    .get('/data/mentors', async (ctx, next) => {
        const result = await mentorQuery()
        ctx.responceType = 'json'

        if(result.ok) ctx.body = result.data
        else ctx.body = {error: result.data}
 
    })
    .get('/data/mentor/:id', async (ctx, next) => {
        const result = await mentorGet(ctx.params.id)
        ctx.responceType = 'json'

        if(result.ok) ctx.body = result.data
        else ctx.body = {error: result.data}
    })
    .post('/update/mentor/:id', async (ctx, next) => {
        const result = await mentorUpdate(ctx.params.id)
        ctx.responceType = 'html'
        
        if(result.ok) ctx.body = result
        else ctx.body = {error: result.data}
    })
    .get('/*', (ctx, next) => {
        ctx.body = ctx.body || ''

        ctx.body += 'spa'
    })

module.exports = appRouter