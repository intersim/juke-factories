'use strict';

juke.factory('PlayerFactory', function($rootScope){
  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var songList;
  var progress;

  audio.addEventListener('timeupdate', function () {
    progress = audio.currentTime / audio.duration;
    $rootScope.$digest();
  });

  // non-UI logic in here
  var factory = {

    start: function (song, albumSongList) {
      // stop existing audio (e.g. other song) in any case
      if (!albumSongList) { songList = $rootScope.songList; } else { songList = albumSongList; }
      this.pause();
      currentSong = song;
      playing = true;
      audio.src = song.audioUrl;
      audio.load();
      audio.play();
    },

    pause: function () {
      playing = false;
      audio.pause();
    },

    resume: function () {
      playing = true;
      audio.play();
    },

    isPlaying: function () {
      return playing;
    },

    getCurrentSong: function () {
      return currentSong;
    },

    next: function () {
      var nextSong;
      var songIdx = songList.indexOf(currentSong);
      if (songIdx === songList.length - 1) {
        nextSong = songList[0];
      } else {
        nextSong = songList[songIdx + 1];
      }

      this.start(nextSong, songList);
    },

    previous: function () {
      var prevSong;

      var songIdx = songList.indexOf(currentSong);
        if (songIdx === 0) {
          prevSong = songList[songList.length - 1];
        } else {
          prevSong = songList[songIdx - 1];
        }

      this.start(prevSong, songList);
    },

    getProgress: function () {
      if (!progress) return 0;
      return progress;
    }

  };

  audio.addEventListener('ended', factory.next);

  return factory;
});