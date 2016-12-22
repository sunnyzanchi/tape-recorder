<style lang="css">

</style>
<!--  -->
<template lang="html">
  <button class="record ready" @click="toggleRecord">
    <transition name="fade">
      <i class="material-icons"
         v-if="recordStatus === 'ready'"
         key="ready">mic</i>
      <i class="material-icons"
         v-if="recordStatus === 'recording'"
         key="recording">pause</i>
    </transition>
  </button>
</template>
<!--  -->
<script>
import Dexie from 'dexie';

export default {
  components: {},
  computed: {
    /* Returns the text for which icon to use */
    icon(){
      switch(this.recordStatus){
        case 'ready':
          return 'mic';
        case 'recording':
          return 'pause';
      }
    }
  },
  data(){
    return {
      recordStatus: 'ready'
    }
  },
  methods: {
    /* Toggles the recording state */
    toggleRecord(){
      //const ctx = new (AudioContext || webkitAudioContext)();
      if(this.recordStatus === 'ready') this.recordStatus = 'recording';
      else this.recordStatus = 'ready';
    }
  },
  mounted(){},
  props: []
}
</script>
