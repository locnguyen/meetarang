'use strict';

require('app-module-path').addPath('./');

let port = process.env.PORT || 9000;
let env = process.env.NODE_ENV || 'development';

let Hapi = require('hapi');

let server = new Hapi.Server({ app: require('./config')[env] });

server.connection({ port: port });

server.start(() => console.log(`Server started at port ${port}`));