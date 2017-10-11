const typeToHeaders = {
    json: (ctx) => {
        ctx.set('Content-Type', 'application/json; charset=utf-8')
    },
    html: (ctx) => {
        ctx.set('Content-Type', 'text/html; charset=utf-8')
    },
}

const setHeaders = async (ctx, next) => {
    if(typeToHeaders[ctx.responceType]) typeToHeaders[ctx.responceType](ctx)
    await next()
}

module.exports = () => setHeaders