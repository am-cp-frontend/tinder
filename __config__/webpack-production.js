const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')
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
        new WebpackChunkHash({algorithm: 'md5'}),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
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
