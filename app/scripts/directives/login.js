'use strict';

/**
 * @ngdoc directive
 * @name freeRadicalsApp.directive:login
 * @description
 * # login
 */
angular.module('freeRadicalsApp')
  .directive('login', ['$firebaseAuth', function ($firebaseAuth) {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the login directive');
      }
    };
  }]);
