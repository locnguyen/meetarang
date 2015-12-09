'use strict';

require('app-module-path').addPath('./');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = require('./config');
const Hapi = require('hapi');

const server = new Hapi.Server({ app: config });

server.connection({ port: config.port });

server.register([
    {
        register: require('api/auth')
    },
    {
        register: require('hapi-auth-jwt')
    }
], (err) => {
    if (err) {
        console.log('Could not register all the Hapi plugins');
        throw err;
    }

    server.auth.strategy('token', 'jwt', {
        key: config.jwtKey
    })
});

server.route({
    method: 'GET',
    path: '/hello',
    config: {
        auth: 'token',
        handler: function (request, reply) {
            reply('hello world');
        }
    }
});

server.start(() => console.log(`Server started at port ${config.port}`));