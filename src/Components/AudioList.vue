<template lang="html">
  <md-list class="md-triple-line">
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
import {
  getAllTracks,
  removeTrack
} from '../db.js';

import {
  bus,
  dbupdate
} from '../bus.js';

import AudioListItem from './AudioListItem.vue';

export default {
  components: {
    AudioListItem
  },
  computed: {},
  created(){
    bus.$on(dbupdate, this.updateTracks);
    this.updateTracks();
  },
  data(){
    return {
      tracks: []
    }
  },
  methods: {
    async updateTracks(){
      this.tracks = await getAllTracks();
    }
  },
  mounted(){},
  props: []
}
</script>
