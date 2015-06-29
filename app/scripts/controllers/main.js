'use strict';

/**
 * @ngdoc function
 * @name freeRadicalsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the freeRadicalsApp
 */
angular.module('freeRadicalsApp')
  .controller('MainCtrl', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', function ($scope, $firebaseAuth, $firebaseArray, $location) {
    $scope.changePage = function () {
      $('body').css({'background-color': 'green'});
      $location.path('cascade');
    }
  }]);
