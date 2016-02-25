'use strict';

export default function (ngModule) {
    require('./session.service')(ngModule);
    require('./dashboard.service')(ngModule);
}