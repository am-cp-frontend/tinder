const fs = require('fs')

var env = 'base'

if(process.argv.indexOf('--env.production') != -1) env = 'production'

module.exports = require('./webpack-' + env + '.js')
