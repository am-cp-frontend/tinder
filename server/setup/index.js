const config = require('../config')
const logger = config.logger

const setups = [
    {
        funcs: require('./db'),
        args: {
            prepare: [config.path.db],
            execute: [config.mongoUrl]
        }
    }, {
        funcs: require('./fields'),
        args: {
            prepare: [config.path.fields],
            execute: [config.path.fields]
        }
    }
]


const setupBackend = async () => {
    logger.log('\n ------ \nSetting up backend')

    await Promise.all(setups.map(setup => setup.funcs.prepare(logger, ...setup.args.prepare)))
    await Promise.all(setups.map(setup => setup.funcs.execute(logger, ...setup.args.execute)))

    logger.log('Setup Sucessful\n ------ \n')
    return
}

module.exports = setupBackend