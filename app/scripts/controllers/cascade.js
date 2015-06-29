'use strict';

/**
 * @ngdoc function
 * @name freeRadicalsApp.controller:CascadeCtrl
 * @description
 * # CascadeCtrl
 * Controller of the freeRadicalsApp
 */
angular.module('freeRadicalsApp')
  .controller('CascadeCtrl', ['$scope', 'Users', function ($scope, Users) {
    $scope.users = Users;
  }]);
