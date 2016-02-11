'use strict'

juke.controller('AlbumsCtrl', function($scope, $http, $log, $rootScope) {
  $http.get('/api/albums')
  .then(res => res.data)
  .then(albums => {
    albums.forEach(function (album, i) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.albumsIndex = i;
      album.songsNum = album.songs.length;
    });

    $scope.albums = albums;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.$on('viewAlbums', function () {
    $scope.showAlbums = true;
  })

  $scope.viewOneAlbum = function () {
    $scope.showAlbums = false;
    $rootScope.$broadcast('viewOneAlbum', {id: this.album._id});
  }

});
