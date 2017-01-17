<template lang="html">
  <md-list-item>
    <!-- Play icon -->
    <div class="play-icon-holder" @click="togglePlay">
      <transition name="fade">
        <md-icon v-if="playing"
           key="pause">pause</md-icon>
        <md-icon v-if="!playing"
           key="play">play_arrow</md-icon>
      </transition>
    </div>

    <!-- Track Info -->
    <div class="md-list-text-container" @click="togglePlay">
      <span>{{track.name}}</span>
      <span>{{track.duration | humanizeDuration}}</span>
      <div v-show="showWaveform && playing" ref="trackVisualization"></div>
      <audio v-show="playing" :src="src" autoplay ref="audio"></audio>
    </div>

    <!-- Right side 'more' menu -->
    <md-menu md-direction="bottom right">
      <md-button md-menu-trigger class="md-icon-button md-list-action">
        <md-icon>more_vert</md-icon>
      </md-button>
      <md-menu-content>
        <md-menu-item>Save</md-menu-item>
        <md-menu-item @click="deleteTrack(track.id)">Delete</md-menu-item>
      </md-menu-content>
    </md-menu>
  </md-list-item>
</template>
<!--  -->
<script>
import {getTrack, removeTrack} from '../db.js';
import {bus, deletecancel, trackdelete, trackupdate} from '../bus.js';
import WaveSurfer from 'wavesurfer';

export default {
  created(){
    const self = this;

    bus.$on(trackupdate, function(id){
      if(self.track.id !== id) self.stopTrack();
    });
  },
  data(){
    return {
      playing: false,
      showWaveform: false,
      src: null
    };
  },
  filters: {
    humanizeDuration(duration){
      // Chrome uses a DOMHighResTimeStamp, which will have a decimal
      if(String(duration).indexOf('.') > 0)
        duration = duration / 1000;
      else duration = duration / 1000000;
      duration = Math.floor(duration);
      if(duration < 1) return 'Less than 1 second';
      if(duration === 1) return '1 second';
      if(duration < 60) return `${duration} seconds`;
      var minutes = Math.floor(duration / 60);
      var seconds = duration % 60;
      seconds = String(seconds).length === 1 ? '0' + seconds : seconds;
      return `${minutes}:${seconds}`;
      //TODO: Add logic for recordings > an hour
    }
  },
  methods: {
    /* Delete track from DB, but do it on a timeout so the user can undo */
    deleteTrack(id){
      const self = this;

      bus.$emit(trackdelete, id);
      let timeout = setTimeout(function(){
        removeTrack(id);
      }, 5000);

      bus.$on(deletecancel, function(deleteId){
        if(deleteId === id){
          clearTimeout(timeout);
          self.hidden = false;
        }
      });
    },

    /* Retrieve data from DB based on id and use blob to create audio
        or if audio src is already created, play it
    */
    playTrack(){
      const self = this;
      let id = this.track.id;
      if(!this.src)
        createAudio(this.track.data);
      else{
        self.playing = true;
        this.$refs.audio.play();
      }

      bus.$emit(trackupdate, self.track.id);
      function createAudio(data){
        let objectURL = URL.createObjectURL(data);
        self.playing = true;
        self.src = objectURL;
      }
    },

    /* Pause track */
    pauseTrack(){
      this.playing = false;
      this.$refs.audio.pause();
    },

    /* Stop track */
    stopTrack(){
      this.playing = false;
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
    },

    /* Toggle play */
    togglePlay(){
      if(!this.playing){
        this.playTrack();
      }
      else{
        this.pauseTrack();
      }

    }
  },
  mounted(){
    const self = this;
    const wave = WaveSurfer.create({
      container: this.$refs.trackVisualization
    });
    wave.on('ready', function(){
      self.showWaveform = true;
    })
    wave.loadBlob(this.track.data);
  },
  props: ['track']
}
</script>
