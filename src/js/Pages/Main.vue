<style>
  .sidenav-content{
    padding: 15px;
  }
</style>
<template lang="html">
  <div>
    <!-- Title bar -->
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">Tape Recorder</h2>
    </md-toolbar>

    <!-- Name track dialog -->
    <md-dialog-prompt
      md-title="Enter track name"
      md-ok-text="Save"
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

      <div class="sidenav-content">
        <md-icon>play_arrow</md-icon>
        <span>Metronome</span>
        <md-input-container>
          <label>BPM</label>
          <md-input md-inline type="number"></md-input>
        </md-input-container>
      </div>
    </md-sidenav>

    <audio-list/>

    <recorder/>

    <!-- Undo recording deleted -->
    <md-snackbar md-position="bottom right" ref="snackbar">
      <span>Recording deleted</span>
      <md-button class="md-primary" @click.native="deleteCancel">Undo</md-button>
    </md-snackbar>

  </div>
</template>
<!--  -->
<script>
import Recorder from 'Components/Recorder.vue';
import AudioList from 'Components/AudioList.vue';

import {bus, deletecancel, dialogcancel, dialogsubmit, dialogupdate, trackdelete} from '../bus.js';

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

    bus.$on(trackdelete, function(id){
      self.deleteId = id;
      self.$refs.snackbar.open();
    });
  },
  data(){
    return {
      dialogInput: '',
      dialogTimeStamp: '',
      deleteId: Infinity
    }
  },
  methods: {
    deleteCancel(){
      bus.$emit(deletecancel, this.deleteId);
      this.$refs.snackbar.close();
    },
    changePageReciever(){
      console.log('test');
    },
    dialogClose(type){
      const self = this;
      if(type === 'ok')
        bus.$emit(dialogsubmit, {name: self.dialogInput, timeStamp: self.dialogTimeStamp});
      if(type === 'cancel')
        bus.$emit(dialogcancel, self.dialogTimeStamp);

      this.dialogInput = null;
      this.dialogTimeStamp = null;
    },
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    }
  },
  mounted(){},
  props: []
}
</script>
