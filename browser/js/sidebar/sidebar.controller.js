'use strict';

juke.controller('SidebarCtrl', function($scope, $rootScope) {

  $scope.viewAlbums = function () {
    $rootScope.$broadcast('viewAlbums');
  }

  $scope.viewAllArtists = function () {
    $rootScope.$broadcast('viewArtists');
  }

});