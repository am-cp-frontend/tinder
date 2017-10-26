const crypto = require('crypto')

const config  = require('../../config')
const MagicLink = require('../../models/magicLinkModel')

const magicLinkGenerate = async (type, target) => {
    config.logger.log('Generating new magic link for', target.name)
    
    let resultData
    const maginLinkData = {type, targetId: target._id}
    const oldLink = await MagicLink.findOne({targetId: target._id})

    if(target.mainEmail) maginLinkData.email = target.mainEmail
    else maginLinkData.contact = target.contact[0]

    maginLinkData.token = crypto.createHmac('sha256', config.secret)
                                .update(target._id.toString())
                                .update(Math.random().toString())
                                .digest('hex')

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