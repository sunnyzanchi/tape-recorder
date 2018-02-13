<style scoped>
  button {
    background: #1976d2;
    border: 0;
    border-radius: 50%;
    bottom: 16px;
    color: #fff;
    height: 64px;
    left: 50%;
    position: absolute;
    transform: translate(-50%);
    transition: .2s background-color;
    width: 64px;
  }
  button:hover{
    background: #1565c0;
    cursor: pointer;
  }
</style>
<template>
  <button @click="toggleRecord">
    {{ buttonText }}
  </button>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import * as db from '../db';

const constraints = { audio: true };

export default {
  computed: mapState({
    buttonText: state => state.isRecording ? 'Recording' : 'Record',
    isRecording: 'isRecording',
  }),
  data() {
    return {
      mediaRecorder: null,
      startTime: null,
    };
  },
  methods: {
    ...mapMutations(['startRecording', 'stopRecording']),
    toggleRecord() {
      if (this.isRecording) {
        console.log('stopping recording');
        this.mediaRecorder.stop();
        return this.$store.commit('stopRecording');
      }

      console.log('starting recording');
      this.$store.commit('startRecording');
      return navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          const chunks = [];
          const mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder = mediaRecorder;

          mediaRecorder.ondataavailable = ({ data }) => chunks.push(data);
          mediaRecorder.onstart = ({ timeStamp }) => this.startTime = timeStamp;
          mediaRecorder.onstop = ({ timeStamp }) => {
            const duration = timeStamp - this.startTime;
            const data = new Blob(chunks, { type: mediaRecorder.mimeType });

            db.addTrack({
              data,
              duration,
              name: String(Math.random()),
            });
          };
        });
    },
  },
};
</script>
