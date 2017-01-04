<template lang="html">
  <div>
    <md-toolbar>
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">Tape Recorder</h2>
    </md-toolbar>
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
    }
  },
  mounted(){},
  props: []
}
</script>
