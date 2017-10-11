const typeToHeaders = {
    html: (ctx) => {
        ctx.set('Content-Type', 'text/html; charset=utf-8')
    }
}

const setHeaders = async (ctx, next) => {
    await next()

}