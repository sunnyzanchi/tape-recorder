<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
<template>
  <ul>
    <TrackListItem
      v-for="track in tracks"
      :key="track.name"
      :track="track"
    />
  </ul>
</template>
<script>
import { mapGetters } from 'vuex';
import TrackListItem from './TrackListItem.vue';

export default {
  components: {
    TrackListItem,
  },
  computed: mapGetters({
    tracks: 'prettyTracks',
  }),
};
</script>
