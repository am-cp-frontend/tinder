const mongoose = require('mongoose')

const magicLinkSchema = require('../schemas/magicLinkSchema')

const MagicLink = mongoose.model('MagicLink', magicLinkSchema)

module.exports = MagicLink