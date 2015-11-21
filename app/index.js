import 'angular';
import 'angular-material';
import 'angular-material/angular-material.scss';
import 'angular-ui-router';
import 'angular-messages';

if (ON_TEST) {
    // Babel won't let us use import syntax here
    require('angular-mocks/angular-mocks');
}

const ngModule = angular.module('meetarang', ['ngMaterial', 'ngMessages', 'ui.router']);

require('./features')(ngModule);