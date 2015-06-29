'use strict';

/**
 * @ngdoc service
 * @name freeRadicalsApp.user
 * @description
 * # user
 * Service in the freeRadicalsApp.
 */
angular.module('freeRadicalsApp')
  .service('Users', ['$routeParams', '$firebaseAuth',  '$firebaseObject', '$location', function ($routeParams, $firebaseAuth, $firebaseObject, $location) {

    var $scope = {};

    var ref = new Firebase("https://free-radical.firebaseio.com/cascade");
    // create an instance of the authentication service

    $scope.inviter = $routeParams.inv ? $firebaseObject(ref.child("rsvps").child(Number($routeParams.inv))) : null;

    var auth = $firebaseAuth(ref);
    // login with Facebook

    var _nums = ['zero', 'one', 'two', 'three', 'four', 'five'];
    var _url = "http://localhost:9000";

    if ($scope.inviter && $scope.inviter.invites == 0) {
      $scope.badInvite = true;
    };

    $scope.rsvp = function () {
      auth.$authWithOAuthPopup("facebook", { scope: 'email', remember: "sessionOnly" }).then(function(authData) {
        $scope.invitee = $firebaseObject(ref.child('rsvps').child(authData.facebook.id));
        $scope.invitee = _.extend($scope.invitee, authData.facebook.cachedUserProfile);

        $scope.invitee.invitesInit = $scope.inviter.invitesInit - 1;
        $scope.invitee.invites = $scope.inviter.invitesInit - 1;

        $scope.inviter.invites = $scope.inviter.invites - 1;

        $scope.inviter.$save();
        $scope.invitee.$save();

        $scope.inviteUrl = _url + authData.facebook.id;

        $location.path("confirmation");

      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    };

    $scope.regInvite = function () {
      auth.$authWithOAuthPopup("facebook", { scope: 'email', remember: "sessionOnly" }).then(function(authData) {
        $scope.requester = $firebaseObject(ref.child('requesters').child(authData.facebook.id));
        $scope.requester = _.extend($scope.requester, authData.facebook.cachedUserProfile);
        $scope.requester.$save();

        $scope.requestedInvite = true;

        console.log(authData);

        $location.path("confirmation");
      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    };

    return $scope;
  }]);
