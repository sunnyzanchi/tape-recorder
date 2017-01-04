<template lang="html">
  <div>
    <!-- Title bar -->
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">Tape Recorder</h2>
    </md-toolbar>

    <!-- Side drawer -->
    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>
    </md-sidenav>

    <md-tabs md-centered md-fixed>
      <!-- List of Recordings -->
      <md-tab md-icon="list">
        <audio-list/>
      </md-tab>

      <!-- Record tab -->
      <md-tab md-icon="mic">
        <div class="record-holder">
          <recorder/>
        </div>
      </md-tab>
    </md-tabs>
  </div>
</template>
<!--  -->
<script>
import Recorder from '../Components/Recorder.vue';
import AudioList from '../Components/AudioList.vue';

export default {
  components: {
    AudioList,
    Recorder
  },
  computed: {},
  created(){},
  data(){
    return {}
  },
  methods: {
    changePageReciever(){
      console.log('test');
    },
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    }
  },
  mounted(){},
  props: []
}
</script>
