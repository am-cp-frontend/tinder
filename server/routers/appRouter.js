const Router = require('koa-router')
const send = require('koa-send')
const appRouter = new Router() 

const config = require('../config')
const mentorGet = require('../func/mentor/mentorGet')
const mentorQuery = require('../func/mentor/mentorQuery')
const mentorUpdate = require('../func/mentor/mentorUpdate')

const email = require('../utility/email')

const magicLinkGet = require('../func/magicLink/magicLinkGet')
const magicLinkGenerate = require('../func/magicLink/magicLinkGenerate')


const mentorFields = require('../setup/fields').list
const cookieOptions = {
    httpOnly:false,
    overwrite: true,
    maxAge: 24 * 60 * 60 * 1000
}

appRouter
    //wouldn't bother with security right now
    .get('/auth/magic/:token', async (ctx, next) => {
        // favicon auth bug fix
        if(ctx.params.token.indexOf('favicon.') !== -1) return;
        

        config.logger.log('auth attempt with', ctx.params.token)
        const tokenResult = await magicLinkGet(ctx.params.token)
        const user = {}
        let authError = false


        if(tokenResult.ok) {
            ctx.session.token = ctx.params.token
            user.type = tokenResult.data.type
            user.id = tokenResult.data.targetId
            const updateResult = await mentorUpdate(tokenResult.data.targetId, {decline: false})
        } else {
            authError = tokenResult.data
        }
 
        ctx.cookies.set('user', JSON.stringify(user), cookieOptions)
        ctx.cookies.set('authError', authError, cookieOptions)

        await next()
    })
    .get('/auth/decline/:token', async (ctx, next) => {
        config.logger.log('auth decline with', ctx.params.token)

        const tokenResult = await magicLinkGet(ctx.params.token)
        const user = {}
        let authError = false


        if(tokenResult.ok) {
            const updateResult = await mentorUpdate(tokenResult.data.targetId, {decline: true})
            if(updateResult.ok) {
                ctx.body = 'Спасибо, что откликнулись, поднаучные не будут вас беспокоить в этом году.'
                ctx.body += '\nВы всегда можете изменить свое решение перейдя по ссылке для входа.'
            }
        }
    })
    .get('/auth/logout', async (ctx, next) => {
        ctx.session.token = undefined
        ctx.body = {
            ok: true
        }
    })
    .post('/auth/sendMagic', async ctx => {
        const mentorResult = await mentorQuery({mainEmail: ctx.request.body.email})

        if(mentorResult.ok) {
            if(mentorResult.data.length) {
                const magicLinkResult = await magicLinkGenerate('mentor', mentorResult.data[0])
                if(magicLinkResult.ok) {
                    const emailContent = email.template.magicLink(
                        magicLinkResult.data.token,
                        mentorResult.data[0].name
                    )
                    await email.send(Object.assign({
                        to: mentorResult.data[0].mainEmail,
                        subject: 'Поиск учеников для научного руководства'
                    }, emailContent))
                    ctx.body = {ok: true}
                } else {
                    ctx.body = {ok: false, data: {error: magicLinkResult.data}}
                }
            }
            else {
                ctx.body = {ok: false, data: {error: 'Not found'}}
            }
        } else {
            ctx.body = {ok: false, data: {error: result.data}}
        }
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
    .get('/data/fields', async (ctx, next) => {
        ctx.body = mentorFields
    })
    .post('/update/mentor/:id', async (ctx, next) => {
        //verification
        if(ctx.session.token) {
            const tokenResult = await magicLinkGet(ctx.session.token)
            
            if(tokenResult.ok && tokenResult.data.type === 'mentor' 
               && tokenResult.data.targetId.toString() === ctx.params.id) {
                //update
                const result = await mentorUpdate(ctx.params.id, ctx.request.body)
                ctx.responceType = 'html'
                
                ctx.body = result
            } else {
                ctx.body = {
                    ok: false,
                    data: {
                        type: 401,
                        error: 'No rights'
                    }
                }
            }
        } else {
            ctx.body = {
                ok: false,
                data: {
                    type: 401,
                    error: 'No login'
                }
            }
        }
    })
    .get('/*', async (ctx, next) => {
        await send(ctx, config.path.dist + '/index.html', { root: '/' })
    })

module.exports = appRouter