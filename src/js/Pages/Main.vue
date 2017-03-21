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
    <side-nav ref="leftSidenav"/>

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
import AudioList from 'Components/AudioList.vue';
import Recorder from 'Components/Recorder.vue';
import SideNav from 'Components/SideNav.vue';

import {bus, deletecancel, dialogcancel, dialogsubmit, dialogupdate, trackdelete} from '../bus.js';

export default {
  components: {
    AudioList,
    Recorder,
    SideNav
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
