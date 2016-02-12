'use strict';

juke.factory('PlayerFactory', function($rootScope){
  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var currentList = [];
  var progress;

  audio.addEventListener('timeupdate', function () {
    progress = audio.currentTime / audio.duration;
    $rootScope.$digest();
  });

  // non-UI logic in here
  var factory = {

    start: function (song, songList) {
      // stop existing audio (e.g. other song) in any case
      this.pause();
      currentSong = song;
      currentList = songList;
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
      var songIdx = currentList.indexOf(currentSong);
      if (songIdx === currentList.length - 1) {
        nextSong = currentList[0];
      } else {
        nextSong = currentList[songIdx + 1];
      }

      this.start(nextSong, currentList);
    },

    previous: function () {
      var prevSong;

      var songIdx = currentList.indexOf(currentSong);
        if (songIdx === 0) {
          prevSong = currentList[currentList.length - 1];
        } else {
          prevSong = currentList[songIdx - 1];
        }

      this.start(prevSong, currentList);
    },

    getProgress: function () {
      if (!progress) return 0;
      return progress;
    }

  };

  audio.addEventListener('ended', factory.next);

  return factory;
});