const path = require('path')

const merge = require('webpack-merge')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const pathToWebpack = path.resolve(__dirname, '../__config__/')
const pathToRules   = path.join(pathToWebpack, 'rules')
const __dir_adapter = pathToWebpack

const getJSrules    = require(pathToRules + '/js-jsx')
const getCSSrules   = require(pathToRules + '/css')
const getAliasRules = require(pathToRules + '/alias')



module.exports = (storybookBaseConfig, configType) => {
    if (configType === 'PRODUCTION') {
        // see https://github.com/storybooks/storybook/issues/1570
        storybookBaseConfig.plugins = storybookBaseConfig.
            plugins.filter(plugin => 
                plugin.constructor.name !== 'UglifyJsPlugin')
    }

    storybookBaseConfig.module.rules = []

    const extension = {
        module: {
            rules: [
                getCSSrules(__dir_adapter),
                getJSrules(__dir_adapter),
                getAliasRules(__dir_adapter)
            ]
        },

        plugins: [
            new ExtractTextPlugin("app.css"),
        ]
    }

    return merge(storybookBaseConfig, extension)
}