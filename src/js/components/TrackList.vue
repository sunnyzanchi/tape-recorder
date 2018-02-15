<style>

</style>
<template>
  <ul>
    <li
      v-for="track in tracks"
      :key="track.name">
      <p>{{ track.name }}</p>
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['tracks']),
  },
};
</script>
