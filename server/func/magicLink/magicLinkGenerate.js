const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const config  = require('../../config')
const MagicLink = require('../../models/magicLinkModel')

const magicLinkGenerate = async (type, target) => {
    config.logger.log('Generating new magic link for', target.name)
    
    let resultData
    const maginLinkData = {type, targetId: target._id}
    const oldLink = await MagicLink.findOne({targetId: target._id})

    if(target.mainEmail) maginLinkData.email = target.mainEmail
    else maginLinkData.contact = target.contact[0]

    maginLinkData.token = jwt.sign({ id: target._id }, config.secret)

    try {
        if(oldLink) {
            Object.assign(oldLink, maginLinkData)
            await oldLink.save()

            resultData = oldLink
        }
        else {
            const newLink = new MagicLink(maginLinkData)
            await newLink.save()

            resultData = newLink
        }
        return {ok: true, data: resultData}
    } catch(err) {
        config.logger.error(err)
        return {ok: false, data: err}
    }
}

module.exports = magicLinkGenerate