<style scoped>
  li {
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    padding: 12px;
    transition: .2s background;
  }
  li:hover {
    cursor: pointer;
    background: #eee;
  }
  p.subtitle{
    color: #777;
    font-size: .8em;
  }
  p.title {
    margin: 0;
  }
</style>
<template>
  <li @click="togglePlay">
    <i v-show="isPlaying">Playing</i>
    <p class="title">{{ track.name }}</p>
    <p class="subtitle">{{ track.date }}</p>
    <audio
      ref="audio"
      :src="src"
    />
  </li>
</template>
<script>
import { mapMutations, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      isPlaying(state) {
        return this.src === state.playing;
      },
    }),
    src() {
      return URL.createObjectURL(this.track.data);
    },
  },
  methods: {
    ...mapMutations(['startPlaying', 'stopPlaying']),
    togglePlay() {
      if (this.isPlaying) {
        this.stopPlaying();
        this.$refs.audio.pause();
      } else {
        this.startPlaying(this.src);
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      }
    },
  },
  mounted() {
    this.$refs.audio.addEventListener('ended', this.stopPlaying);
  },
  props: {
    track: {
      required: true,
      type: Object,
    },
  },
  watch: {
    isPlaying(newVal) {
      if (!newVal) {
        this.$refs.audio.pause();
      }
    },
  },
};
</script>

