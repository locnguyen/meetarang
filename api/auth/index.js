'use strict';

const Wreck = require('Wreck');
const Joi = require('Joi');
const Boom = require('Boom');
const jwt = require('jsonwebtoken');


function register (server, options, next) {

    const meetup = server.settings.app.meetup;

    server.route({
        method: 'POST',
        path: '/oauth2/access',
        config: {
            validate: {
                query: {
                    code: Joi.string().required()
                }
            },
            handler: function (request, reply) {
                let queryParams = `client_id=${meetup.oauthClientId}&client_secret=${meetup.oauthClientSecret}&grant_type=authorization_code&redirect_uri=http%3A%2F%2Fmeetarang.io%3A8080&code=${request.query.code}`;

                let config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    },
                    payload: queryParams
                };

                Wreck.post(`${server.settings.app.meetup.apiBase}/oauth2/access`, config, (err, response, payload) => {
                    if (err) {
                        reply(Boom.badImplementation('Server error, could not complete authentication'));
                    }

                    if (response.statusCode === 200) {

                        let json = JSON.parse(payload);
                        let token = jwt.sign(json, server.settings.app.jwtKey, {algorithm: 'HS256'});
                        reply({token: token});
                    
                    } else {
                        reply(Boom.create(response.statusCode, 'Meetup could not complete authentication'));
                    }
                });
            }
        },
    });

    next();
}

register.attributes = {
    name: 'auth'
};

module.exports.register = register;