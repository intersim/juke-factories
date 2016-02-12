'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {

  $scope.$on('viewArtists', function () {
    $scope.showOneAlbum = false;
  })

  // load our initial data
  $scope.$on('viewOneAlbum', function (event, data) {
    if (data.name !== 'oneAlbum') return $scope.showOneAlbum = false;
    $scope.showOneAlbum = true;

    $http.get('/api/albums/' + data.id)
    .then(res => res.data)
    .then(function (album) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      return album;
    })
    .then(function (album) {
      album.songs.forEach(function (song) {
        song.audioUrl = '/api/songs/' + song._id + '.audio';
      })
      $scope.album = album;
    })
    .catch($log.error);

  })

  // add total duration (in seconds)
  // StatsFactory.totalTime($scope.album)
  // .then(function (albumDuration) {
  //   $scope.fullDuration = Math.floor(albumDuration/60);
  // })
  // .catch($log.error);

  $scope.playing = function() {
    return PlayerFactory.isPlaying();
  };

  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  };

  //main toggle
  $scope.toggle = function (song, songList) {
    if (PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song) {
      PlayerFactory.pause();
    } else { 
      PlayerFactory.start(song, songList);
    };
  };

});
