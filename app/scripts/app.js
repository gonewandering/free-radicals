'use strict';

/**
 * @ngdoc overview
 * @name freeRadicalsApp
 * @description
 * # freeRadicalsApp
 *
 * Main module of the application.
 */
angular
  .module('freeRadicalsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/cascade/:inv', {
        templateUrl: 'views/cascade.html',
        controller: 'CascadeCtrl'
      })
      .when('/cascade', {
        templateUrl: 'views/cascade.html',
        controller: 'CascadeCtrl'
      })
      .when('/confirmation', {
        templateUrl: 'views/confirmation.html',
        controller: 'ConfirmationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
