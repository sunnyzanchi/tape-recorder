<style>
</style>
<template>
  <div>
    <Header title="Tape Recorder"/>
    <TrackList />
    <RecordButton />
  </div>
</template>
<script>
import Header from '../components/Header.vue';
import RecordButton from '../components/RecordButton.vue';
import TrackList from '../components/TrackList.vue';

export default {
  components: {
    Header,
    RecordButton,
    TrackList,
  },
  mounted() {
    this.$store.dispatch('getTracks');
  },
};
</script>
