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

    var $scope = $scope || {};

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

    $scope.rsvp = function (authData) {
      var id = (authData.facebook ? authData.facebook.id : authData.id);
      $scope.inviteUrl = _url + id;

      if (id !== $scope.inviter.id) {

        $scope.invitee = $firebaseObject(ref.child('rsvps').child(id));

        if (authData.facebook) {
          $scope.invitee = _.extend($scope.invitee, authData.facebook.cachedUserProfile);
        } else {
          $scope.invitee = _.extend($scope.invitee, authData);
        }

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
    }

    $scope.rsvpEmail = function (options) {
      ref.createUser({
        email    : options.email,
        password : options.password
      }, function(error, userData) {
        ref.authWithPassword({
          email    : options.email,
          password : options.password
        }, function(error, authData) {
          $scope.rsvp({
            email: options.email,
            first_name: options.first_name,
            last_name: options.last_name,
            id: btoa(options.email)
          })
        });
      });
    }

    $scope.rsvpFacebook = function () {
      auth.$authWithOAuthPopup("facebook", { scope: 'email', remember: "sessionOnly" }).then(function(authData) {

        $scope.rsvp(authData);

      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    };

    return $scope;
  }]);
