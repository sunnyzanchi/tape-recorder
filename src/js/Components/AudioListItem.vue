<template lang="html">
  <md-list-item>
    <div class="md-list-text-container" @click="playTrack">
      <span>{{track.name}}</span>
      <span>{{track.duration | humanizeDuration}}</span>
      <audio v-if="playing" :src="src" controls></audio>
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

export default {
  data(){
    return {
      playing: false,
      src: null
    };
  },
  filters: {
    humanizeDuration(duration){
      // duration is in milliseconds
      duration = duration / 1000;
      duration = Math.floor(duration);
      if(duration < 1) return 'Less than 1 second';
      if(duration === 1) return '1 second';
      if(duration < 60) return `${duration} seconds`;
      var minutes = Math.floor(duration / 60);
      var seconds = duration % 60;
      return `${minutes}:${seconds}`;
      //TODO: Add logic for recordings > an hour
    }
  },
  methods: {
    /* Delete track from DB */
    deleteTrack(id){
      removeTrack(id);
    },

    /* Retrieve data from DB based on id and use blob to create audio */
    playTrack(){
      const self = this;
      let id = this.track.id;
      getTrack(id).then(createAudio);

      function createAudio({data}){
        let objectURL = URL.createObjectURL(data);
        console.log(objectURL);
        self.playing = true;
        self.src = objectURL;
      }
    }
  },
  props: ['track']
}
</script>
