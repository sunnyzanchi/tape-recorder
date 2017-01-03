<template lang="html">
  <div>
    <div class="record-holder">
      <recorder/>
    </div>
  </div>
</template>
<!--  -->
<script>
//import TitleBar from '../Components/TitleBar.vue';
import {mdCore, mdTitle, mdToolbar} from 'vue-material';
import Recorder from '../Components/Recorder.vue';

export default {
  components: {
    mdCore,
    mdTitle,
    mdToolbar,
    Recorder
  },
  computed: {},
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
