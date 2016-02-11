'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {
  // state
  $scope.currentSong = function() {
    return PlayerFactory.getCurrentSong();
  };

  $scope.playing = function () {
    return PlayerFactory.isPlaying();
  }

  $scope.progress = function () {
    // $scope.$digest();
    return PlayerFactory.getProgress() * 100;
  }

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.resume();
  };

  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // functionality
  function pause () {
    PlayerFactory.pause();
  }

  function play (event, song){
    // resume current song
    if (song === $scope.currentSong) return PlayerFactory.resume();
    // enable loading new song
    $scope.currentSong = song;
    PlayerFactory.start(song);
  }

  // outgoing events (to Album… or potentially other characters)
  $scope.next = function () { pause(); PlayerFactory.next(); $rootScope.$broadcast('next'); };
  $scope.prev = function () { pause(); PlayerFactory.previous(); };

});
