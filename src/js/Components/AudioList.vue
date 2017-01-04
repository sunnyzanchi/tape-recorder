<template lang="html">
  <md-list class="md-double-line">
    <md-list-item v-for="audio in audios">
      <div class="md-list-text-container">
        <span>{{audio.name}}</span>
        <span>{{audio.duration | humanizeDuration}}</span>
      </div>
      <md-menu md-direction="bottom right">
        <md-button md-menu-trigger class="md-icon-button md-list-action">
          <md-icon>more_vert</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item>Save</md-menu-item>
          <md-menu-item>Delete</md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-list-item>
  </md-list>
</template>
<!--  -->
<script>
import Dexie from 'dexie';
import {getAllTracks} from '../db.js';
import {bus} from '../bus.js';
console.log(bus);
export default {
  components: {},
  computed: {},
  created(){
    const self = this;
    bus.$on('dbupdate', updateTracks);

    updateTracks();

    function updateTracks(){
      getAllTracks().then(function(tracks){
        console.log(tracks);
        self.audios = tracks;
      });
    }
  },
  data(){
    return {
      audios: []
    }
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
  methods: {},
  mounted(){},
  props: []
}
</script>
