'use strict';

/**
 * @ngdoc function
 * @name freeRadicalsApp.controller:CascadeCtrl
 * @description
 * # CascadeCtrl
 * Controller of the freeRadicalsApp
 */
angular.module('freeRadicalsApp')
  .controller('CascadeCtrl', ['$scope', '$routeParams', 'Users', function ($scope, $routeParams, Users) {
    $scope.users = Users;

    $scope.inviter = $routeParams.inv;

    $scope.$watch('inviter', function (o,n) {
      if (n.length > 5) {
        $scope.users.checkInviter(n);
      }
    })
  }]);
