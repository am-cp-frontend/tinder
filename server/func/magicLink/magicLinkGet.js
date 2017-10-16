const mongoose = require('mongoose')

const config    = require('../../config')
const MagicLink = require('../../models/magicLinkModel')

const magicLinkGet = async token => {
    try {
        const magicLink = await MagicLink.findOne({token})

        if(magicLink === null) throw new Error('Link not found')

        return {
            ok: true,
            data: magicLink
        }
    } catch (err) {
        config.logger.error(err)
        return {
            ok: false,
            data: err
        }
    }
}

module.exports = magicLinkGet