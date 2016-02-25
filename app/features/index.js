'use strict';

export default function (ngModule) {
    require('./login')(ngModule);
    require('./dashboard')(ngModule);
}