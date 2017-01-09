<template lang="html">
  <div>
    <!-- Title bar -->
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">Tape Recorder</h2>
    </md-toolbar>

    <!-- Name track dialog -->
    <md-dialog-prompt
      md-title="Enter track name"
      md-ok-text="Ok"
      @close="dialogClose"
      v-model="dialogInput"
      ref="saveTrack">
    </md-dialog-prompt>

    <!-- Side drawer -->
    <md-sidenav class="md-left" ref="leftSidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>
    </md-sidenav>

    <audio-list/>
    <div class="record-holder">
      <recorder/>
    </div>
  </div>
</template>
<!--  -->
<script>
import Recorder from '../Components/Recorder.vue';
import AudioList from '../Components/AudioList.vue';

import {bus, dialogcancel, dialogsubmit, dialogupdate} from '../bus.js';

export default {
  components: {
    AudioList,
    Recorder
  },
  computed: {},
  created(){
    const self = this;
    bus.$on(dialogupdate, function(e){
      self.dialogTimeStamp = e.timeStamp;
      self.$refs[e.name].open();
    });
  },
  data(){
    return {
      dialogInput: '',
      dialogTimeStamp: ''
    }
  },
  methods: {
    changePageReciever(){
      console.log('test');
    },
    dialogClose(type){
      const self = this;
      if(type === 'ok')
        bus.$emit(dialogsubmit, {name: self.dialogInput, timeStamp: self.dialogTimeStamp});
      if(type === 'cancel')
        bus.$emit(dialogcancel, self.dialogTimeStamp);

      this.dialogInput = '';
      this.dialogTimeStamp = '';
    },
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    }
  },
  mounted(){},
  props: []
}
</script>
