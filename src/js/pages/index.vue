<style>
</style>
<template>
  <div>
    <Header title="Tape Recorder"/>
    <TrackList />
    <RecordButton />
    <NameModal v-if="showPrompt" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Header from '../components/Header.vue';
import NameModal from '../components/NameModal.vue';
import RecordButton from '../components/RecordButton.vue';
import TrackList from '../components/TrackList.vue';

export default {
  components: {
    Header,
    NameModal,
    RecordButton,
    TrackList,
  },
  computed: mapState(['showPrompt']),
  created() {
    this.$store.dispatch('getTracks');
  },
};
</script>
