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

    $scope.loading = true;

    var ref = new Firebase("https://free-radical.firebaseio.com/cascade/");
    // create an instance of the authentication service

    var auth = $firebaseAuth(ref);
    // login with Facebook

    var _nums = ['zero', 'one', 'two', 'three', 'four', 'five'];
    var _url = "http://freeradicals.nyc/#/cascade/";

    if ($scope.inviter && $scope.inviter.invites == 0) {
      $scope.badInvite = true;
    };


    $scope.checkInviter = function (n) {
      $scope.inviter = $firebaseObject(ref.child("rsvps").child(n));
      $scope.inviter.$loaded(function () {
        $scope.loading = false;
      });
    }


    $scope.rsvp = function () {
      auth.$authWithOAuthPopup("facebook", { scope: 'email', remember: "sessionOnly" }).then(function(authData) {

        $scope.inviteUrl = _url + authData.facebook.id;

        if (authData.facebook.id !== $scope.inviter.id) {

          $scope.invitee = $firebaseObject(ref.child('rsvps').child(authData.facebook.id));
          $scope.invitee = _.extend($scope.invitee, authData.facebook.cachedUserProfile);

          $scope.invitee.invitesInit = $scope.inviter.invitesInit - 1;
          $scope.invitee.invites = $scope.invitee.invitesInit;

          $scope.invitee.invitedBy = {
            first_name: $scope.inviter.first_name,
            last_name: $scope.inviter.last_name,
            id: $scope.inviter.id
          };

          $scope.inviter.invites = $scope.inviter.invites - 1;

          $scope.inviter.$save();
          $scope.invitee.$save();

        } else {
          $scope.invitee = $scope.inviter;
        }

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

        $location.path("confirmation");
      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    };

    return $scope;
  }]);
