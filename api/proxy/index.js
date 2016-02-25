'use strict';

const config = require('../config');

function register(server, options, next) {

    server.route({
        method: ['GET', 'POST'],
        path: '/{path*}',
        config: {
            auth: 'token',
            handler: {
                proxy: {
                    rejectUnauthorized: false,
                    passThrough: true,
                    timeout: 60 * 1000,
                    mapUri (request, callback) {
                        request.headers.authorization = `Bearer ${request.auth.credentials.access_token}`;
                        let destinationUri = `${config.meetup.apiBase}${request.url.pathname}${request.url.search || ''}`;
                        console.log('Proxying request to %s', destinationUri);
                        callback(null, destinationUri);
                    }
                }
            }
        }
    });

    next();
}

register.attributes = {
    name: 'proxy'
};

module.exports.register = register;