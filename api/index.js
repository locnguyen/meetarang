require('app-module-path').addPath(baseDir);

var port = process.env.PORT || 9000;
var env = process.env.NODE_ENV || 'development';

var Hapi = require('hapi');

var server = new Hapi.Server({ app: require('./config')[env] });

server.connection({ port: port });

server.start(function() {
    console.log('Server started at port %d', port);
});