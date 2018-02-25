<style scoped>
  .container {
    display: block;
  }
  .record-button {
      bottom: 16px;
      left: 50%;
      position: absolute;
      transform: translate(-50%);
  }
  .sidebar {
    display: none;
  }
  @media (min-width: 600px) {
    .container {
      display: grid;
      grid-template-areas: "header header"
                           "sidebar main";
      grid-template-columns: 30% auto;
      grid-template-rows: 70px auto;
    }
    .header {
      grid-area: header;
    }
    .main {
      grid-area: main;
    }
    .sidebar {
      border-right: 1px solid #ccc;
      display: block;
      grid-area: sidebar;
    }
  }
</style>
<template>
  <div class="container">
    <Header
      class="header"
      title="Tape Recorder"
    />
    <SideBar class="sidebar"/>
    <TrackList class="main"/>
    <RecordButton class="record-button"/>
    <NameModal v-if="showPrompt" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Header from '../components/Header.vue';
import NameModal from '../components/NameModal.vue';
import RecordButton from '../components/RecordButton.vue';
import SideBar from '../components/SideBar.vue';
import TrackList from '../components/TrackList.vue';

export default {
  components: {
    Header,
    NameModal,
    RecordButton,
    SideBar,
    TrackList,
  },
  computed: mapState(['showPrompt']),
  created() {
    this.$store.dispatch('getTracks');
  },
};
</script>
