const path = require('path')

const config = {
    mongoUrl: 'mongodb://localhost:27017/apmath-tinder',
    appPort: 8082,
    appHost: 'localhost',
    
    secret: 'tinderFTW',

    path: {
        root: __dirname,
        db: __dirname + '/db',
        forms: __dirname + '/forms',
        dist: __dirname + '/dist'
    },
    
    logger: console,

    session: {}
}

module.exports = config