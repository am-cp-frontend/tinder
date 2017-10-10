const config = require('../config')

const setups = [
    {
        funcs: require('./db'),
        args: {
            prepare: [config.dbPath],
            execute: [config.mongoURL]
        }
    }
]


const setupBackend = async (logger) => {
    logger.log('Setting up backend')

    await Promise.all(setups.map(setup => setup.funcs.prepare(logger, ...setup.args.prepare)))
    await Promise.all(setups.map(setup => setup.funcs.execute(logger, ...setup.args.execute)))

    logger.log('Setup Sucessful')
    return
}

module.exports = setupBackend