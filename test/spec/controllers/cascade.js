'use strict';

describe('Controller: CascadeCtrl', function () {

  // load the controller's module
  beforeEach(module('freeRadicalsApp'));

  var CascadeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CascadeCtrl = $controller('CascadeCtrl', {
      $scope: scope
    });
  }));
});
