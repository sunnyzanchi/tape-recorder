<style lang="css">
</style>
<!--  -->
<template lang="html">
  <div>
    <md-toolbar>
      <h1 class="md-title">Testing Title</h1>
    </md-toolbar>
  </div>
</template>
<!--  -->
<script>
//import TitleBar from '../Components/TitleBar.vue';
import {mdCore, mdTitle, mdToolbar} from 'vue-material';

export default {
  components: {
    mdCore,
    mdTitle,
    mdToolbar
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
