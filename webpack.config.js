
module.exports = {
    entry: './js/game.js',
    output: {
        path: __dirname + '/bundled',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
}