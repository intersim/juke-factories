'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {

  $scope.$on('viewOneAlbum', function (event, album) {
    $scope.showOneAlbum = true;
    $scope.album = album;
    console.log($scope.album);
  })

  // load our initial data
  $http.get('/api/albums/')
  .then(res => $http.get('/api/albums/' + res.data[1]._id)) // temp: use first
  .then(res => res.data)
  .then(album => {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    });
    
    $scope.album = album;
    $rootScope.songList = album.songs;

    // add total duration (in seconds)
    StatsFactory.totalTime(album)
    .then(function (albumDuration) {
      $scope.fullDuration = Math.floor(albumDuration/60);
    });
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.playing = function() {
    return PlayerFactory.isPlaying();
  };

  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  };

  //main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    } else { 
      PlayerFactory.start(song);
    };
  };

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality
  // function pause () {
  //   PlayerFactory.pause();
  // }
  // function play (event, song) {
  //   $scope.currentSong = song;
  //   PlayerFactory.play(song);
  // };

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!PlayerFactory.getCurrentSong()) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   // if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // };
  // function next () { PlayerFactory.next(); };
  // function prev () { PlayerFactory.previous(); };

});
