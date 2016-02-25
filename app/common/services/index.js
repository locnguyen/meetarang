'use strict';

export default function (ngModule) {
    require('./app.config')(ngModule);
    require('./session.service')(ngModule);
    require('./dashboard.service')(ngModule);
    require('./user.service')(ngModule);
}