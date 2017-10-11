const makePatchSafe = patch => {
    const safePatch = Object.assign({}, patch)
    for(let key in safePatch) {
        if(key.startsWith('_')) delete safePatch[key]
    }

    return safePatch
}

module.exports = makePatchSafe