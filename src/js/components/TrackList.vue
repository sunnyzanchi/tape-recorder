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
import format from 'date-fns/format';
import isThisYear from 'date-fns/is_this_year';
import prettyMs from 'pretty-ms';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      tracks: state => state.tracks.map(track => ({
        ...track,
        date: format(
          track.date,
          isThisYear(track.date)
            ? 'MMM Do'
            : 'MMM Do YYYY',
        ),
        duration: prettyMs(track.duration),
      })),
    }),
  },
};
</script>
