const path = require('path')

module.exports = function (__dirname) {
    const paths = require('../utility/paths')(__dirname)

    return {
        enforce: 'pre',
        test: /\.(sass|js|jsx)$/,
        use: {
            loader: 'universal-alias-loader',
            options: {
                alias: {
                    "@common": paths.common,
                    "@src": paths.src,
                    "@stories": paths.stories,
                    "@icons": path.join(paths.src, 'icons'),
                    "@routes": path.join(paths.src, 'routes'),
                    "@utility": path.join(paths.src, 'utility'),
                    "@components": path.join(paths.src, 'components'),
                    '@thisView': (alias, foundPath, filePath) => {
                        let splitFilePath = filePath.split(path.sep)
                        let pagePath = splitFilePath.slice(0, splitFilePath.indexOf('views') + 2).join('/')
                        foundPath = foundPath.replace(alias, pagePath)
                        return foundPath
                    },
                    // /component~ => /component/component
                    '~': (alias, pathToResolve) => {
                        let splitPath = pathToResolve.split('/')
                        pathToResolve = pathToResolve.slice(0, -1) //removing ~
                        pathToResolve += '/' + splitPath[splitPath.length - 1].slice(0, -1)
                        return pathToResolve
                    },
                }
            }
        }
    }
}