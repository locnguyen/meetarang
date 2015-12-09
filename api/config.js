'use strict';
const _ = require('lodash');

const homeDir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME;

const meetarangConfig = require(`${homeDir}/.meetarang.json`);

let config = {
    development: {
        port: 9000,
        meetup: {
            apiBase: 'https://secure.meetup.com'
        }
    },
    qa: {
        port: 9000
    },
    production: {
        port: 9000
    }
};

module.exports = _.merge(config[process.env.NODE_ENV], meetarangConfig);
