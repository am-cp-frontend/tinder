module.exports = function (__dirname) {
    return {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|Common)/,
        query: {
            presets: ["es2015", "stage-1"],
            plugins: [
                "transform-react-jsx",
                "transform-decorators-legacy"
            ]
        }
    }
}