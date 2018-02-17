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
export default {
  computed: {
    src() {
      return URL.createObjectURL(this.track.data);
    },
  },
  data() {
    return {
      isPlaying: false,
    };
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) {
        this.isPlaying = false;
        this.$refs.audio.stop();
      } else {
        this.isPlaying = true;
        this.$refs.audio.play();
      }
    },
  },
  mounted() {
    this.$refs.audio.addEventListener('ended', () => this.isPlaying = false);
  },
  props: {
    track: {
      required: true,
      type: Object,
    },
  },
};
</script>

