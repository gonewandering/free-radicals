'use strict';

/**
 * @ngdoc function
 * @name freeRadicalsApp.controller:ConfirmationCtrl
 * @description
 * # ConfirmationCtrl
 * Controller of the freeRadicalsApp
 */
angular.module('freeRadicalsApp')
  .controller('ConfirmationCtrl', ['$scope', 'Users', function ($scope, Users) {
    $scope.users = Users;
  }]);
