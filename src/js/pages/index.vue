<style>
</style>
<template>
  <div>
    <Header title="Tape Recorder"/>
    <TrackList />
  </div>
</template>
<script>
import Header from '../components/Header.vue';
import TrackList from '../components/TrackList.vue';

export default {
  components: {
    Header,
    TrackList
  },
  mounted() {
    this.$store.dispatch('getTracks');
  }
}
</script>