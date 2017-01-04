<template lang="html">
  <md-list class="md-double-line">
    <transition-group name="list">
      <md-list-item v-for="track in tracks" :key="track.id">
        <div class="md-list-text-container">
          <span>{{track.name}}</span>
          <span>{{track.duration | humanizeDuration}}</span>
        </div>
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
    </transition-group>
  </md-list>
</template>
<!--  -->
<script>
import Dexie from 'dexie';

import {getAllTracks, removeTrack} from '../db.js';
import {bus, dbupdate, dbtrackremove} from '../bus.js';

export default {
  components: {},
  computed: {},
  created(){
    bus.$on(dbtrackremove, this.removeTrackFromList);
    bus.$on(dbupdate, this.updateTracks);
    this.updateTracks();
  },
  data(){
    return {
      tracks: []
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
  methods: {
    deleteTrack(id){
      removeTrack(id);
    },
    removeTrackFromList(id){
      for(let i = 0; i < this.tracks.length; i++){
        if(id === this.tracks[i].id){
          this.tracks.splice(i, 1);
        }
      }
    },
    updateTracks(){
      const self = this;
      getAllTracks().then(function(tracks){
        self.tracks = tracks;
      });
    }
  },
  mounted(){},
  props: []
}
</script>
