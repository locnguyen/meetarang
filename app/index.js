import 'angular';
import 'angular-material';
import 'angular-material/angular-material.scss';

if (ON_TEST) {
    // Babel won't let us use import syntax here
    require('angular-mocks/angular-mocks');
}

const ngModule = angular.module('meetarang', ['ngMaterial']);