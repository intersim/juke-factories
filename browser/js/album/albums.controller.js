'use strict'

juke.controller('AlbumsCtrl', function($scope, $http, $log, $rootScope) {
  $http.get('/api/albums')
  .then(res => res.data)
  .then(albums => {
    albums.forEach(function (album) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.songsNum = album.songs.length;
    });

    $scope.albums = albums;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.$on('viewAlbums', function () {
    $scope.showAlbums = true;
  })

  $scope.$on('viewArtists', function () {
    $scope.showAlbums = false;
  })

  $scope.viewOneAlbum = function (album) {
    $scope.showAlbums = false;
    $rootScope.$broadcast('viewOneAlbum', {name: 'oneAlbum', id: album._id});
  }

});
