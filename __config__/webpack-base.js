const webpack = require('webpack')
const path = require('path')

const WebpackChunkHash = require('webpack-chunk-hash')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const paths = require('./utility/paths')(__dirname)

module.exports = {
    //input
    entry: {
        app: paths.entry,
        vendor: ['react', 'react-dom',
                 'prop-types', 'classnames', 'history', 'buffer',
                 'mobx', 'mobx-react', 'react-mobx-router']
    },

    //transform
    module: {
        rules: [
            require('./rules/alias')(__dirname),
            require('./rules/js-jsx')(__dirname),
            require('./rules/svg')(__dirname),
            require('./rules/css')(__dirname)
        ]
    },

    //output
    output: {
        path: paths.dist,
        publicPath: '/',
        filename: 'src/[name].js',
        chunkFilename: 'src/[name].js'
    },
    plugins: [
        new WebpackChunkHash({algorithm: 'md5'}),
        new ExtractTextPlugin("src/app-[md5:contenthash].css"),
        new HtmlWebpackPlugin({
            title: 'Apmath tinder',
            template: paths.template,
            filename: 'index.html',
            chunks: ['vendor', 'app']
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        new SpriteLoaderPlugin()
    ],

    //dev
    devtool: 'source-map',
    devServer: {
        port: 80,
        historyApiFallback: {
            rewrites: [{
                from: /^(?!\/data\/|\/static\/)/,
                to: '/'
            }]
        },
        proxy: {
            '/data': 'http://localhost:8082',
            '/auth': 'http://localhost:8082',
            '/update': 'http://localhost:8082',
        }
    }
}