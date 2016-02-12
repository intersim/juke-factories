'use strict';

juke.controller('SidebarCtrl', function($scope, $rootScope) {

  $scope.viewAlbums = function () {
    $rootScope.$broadcast('viewAlbums');
  }

  $scope.viewArtists = function () {
    $rootScope.$broadcast('viewArtists');
  }

});