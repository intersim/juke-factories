'use strict';

juke.controller('ArtistCtrl', function ($scope, $http, $log) {

  $scope.$on('viewArtists', function () {
    $scope.showArtists = true;
  })

  $scope.$on('viewAlbums', function () {
    $scope.showArtists = false;
  })

  $scope.$on('viewOneAlbum', function () {
    $scope.showArtists = false;
  })

  $http.get('/api/artists')
  .then(res => res.data)
  .then(function (artists) {
    $scope.artists = artists;
  })
  .catch($log.error);

  $scope.viewOneArtist = function (artist) {
    // $scope.showArtists = false;
    $scope.showOneArtist = true;

    // $http.get('/api/artists/' + artist.id)
    // .then(res => res.data)
    // .then(function (artist) {
    //   $scope.artist = artist;
    // })
    // .catch($log.error);
  }

});