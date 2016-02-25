'use strict';

const Wreck = require('Wreck');
const Joi = require('Joi');
const Boom = require('Boom');
const jwt = require('jsonwebtoken');


function register (server, options, next) {
    const meetup = server.settings.app.meetup;

    function getOauthParams(options) {
        return `client_id=${meetup.oauthClientId}&client_secret=${meetup.oauthClientSecret}&grant_type=${options.grant_type}&redirect_uri=http%3A%2F%2Flocalhost%3A8080`;
    }

    server.route({
        method: 'GET',
        path: '/oauth2/authorize',
        config: {
            handler(request, reply) {
                let url = `https:\/\/secure.meetup.com/oauth2/authorize?client_id=${meetup.oauthClientId}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080`;
                reply.redirect(url);
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/oauth2/access',
        config: {
            validate: {
                query: {
                    code: Joi.string().required()
                }
            },
            handler(request, reply) {
                let queryParams = `${getOauthParams({grant_type: 'authorization_code'})}&code=${request.query.code}`;

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
                        console.log(JSON.parse(payload));
                        reply(Boom.create(response.statusCode, 'Meetup could not complete authentication', payload));
                    }
                });
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/oauth2/refresh',
        config: {
            auth: 'token',
            handler(request, reply) {
                let queryParams = `${getOauthParams({grant_type: 'refresh_token'})}&refresh_token=${request.auth.credentials.refresh_token}`;

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
                        console.log(json);
                        let token = jwt.sign(json, server.settings.app.jwtKey, {algorithm: 'HS256'});
                        reply({token: token});

                    } else {
                        console.log(JSON.parse(payload));
                        reply(Boom.create(response.statusCode, 'Meetup could not complete authentication', payload));
                    }
                });
            }
        }
    });

    next();
}

register.attributes = {
    name: 'auth'
};

module.exports.register = register;