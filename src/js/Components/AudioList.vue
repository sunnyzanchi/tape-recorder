<template lang="html">
  <md-list class="md-double-line">
    <transition-group name="list">
      <audio-list-item v-for="track in tracks"
                       :track="track"
                       :key="track.id">
      </audio-list-item>
    </transition-group>
  </md-list>
</template>
<!--  -->
<script>
import {getAllTracks, removeTrack} from '../db.js';
import {bus, dbupdate, dbtrackremove} from '../bus.js';

import AudioListItem from './AudioListItem.vue';

export default {
  components: {
    AudioListItem
  },
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
  methods: {
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
