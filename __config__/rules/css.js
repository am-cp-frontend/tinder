const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')

module.exports = function (__dirname) {
    let paths = require('../utility/paths')(__dirname)

    const cssLoader = {
        loader: 'css-loader',
        options: {
            url: false,
            import: false,
            modules: true,
            localIdentName: '[hash:base64:5]',
            minimize: (process.env.NODE_ENV === 'production')
        }
    }

    const postCSSLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: true,
            config: {
                path: path.join(paths.config, 'utility', 'postcss.config.js')
            }
        }
    }

    const sassLoader = {
        loader: "sass-loader"
    }

    if (process.env.NODE_ENV === 'production') postCSSLoader.options.sourceMap = false

    return {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                cssLoader,
                postCSSLoader,
                sassLoader
            ]
        })
    }
}