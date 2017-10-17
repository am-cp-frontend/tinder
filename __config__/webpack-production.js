const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer')

const baseConfig = require('./webpack-base')

const mergedConfig = webpackMerge(baseConfig, {
    devtool: false,

    output: {
        filename: 'src/[name]-[chunkhash].js',
        chunkFilename: 'src/[name]-[chunkhash].js'
    },

    plugins: [
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:  JSON.stringify('production'),
            },
            NODE_ENV: JSON.stringify('production'),
            VERSION: JSON.stringify(process.env.VERSION)
        }),

        new webpack.optimize.UglifyJsPlugin(),
    ]
})


if(process.argv.indexOf('--env.analyze') > -1) {
    mergedConfig.plugins.push(
        new RuntimeAnalyzerPlugin({
            mode: 'standalone',
            open: true,
            port: 333,
            watchModeOnly: false
        })
    )
}

module.exports = mergedConfig
