import 'angular';
import 'angular-material';
import 'angular-material/angular-material.scss';
import 'angular-ui-router';
import 'angular-messages';
import {loginModule} from './features/login/login.module.js';

if (ON_TEST) {
    // Babel won't let us use import syntax here
    require('angular-mocks/angular-mocks');
}

const ngModule = angular.module('meetarang', ['ngMaterial', 'ngMessages', 'ui.router', 'meetarang.features.login']);