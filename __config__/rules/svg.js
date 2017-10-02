module.exports = () => {
    return {
        test: /\.svg$/,
        use: ['svg-sprite-loader']
    }
}