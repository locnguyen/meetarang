'use strict';
const webpack = require('webpack');
const path = require('path');

let config = require('./webpack.config');
let WebpackDevServer = require('webpack-dev-server');

let server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: false,
    watch: true
});

server.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

server.listen(8080, 'localhost', (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:8080');
});