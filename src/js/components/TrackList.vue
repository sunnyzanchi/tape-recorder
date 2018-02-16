<style scoped>
  li {
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    padding: 12px;
  }
  p.subtitle{
    color: #777;
    font-size: .8em;
  }
  p.title {
    margin: 0;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
<template>
  <ul>
    <li
      v-for="track in tracks"
      :key="track.name">
      <p class="title">{{ track.name }}</p>
      <p class="subtitle">{{ track.date }}</p>
    </li>
  </ul>
</template>
<script>

import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    tracks: 'prettyTracks',
  }),
};
</script>
