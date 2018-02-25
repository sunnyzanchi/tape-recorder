<style scoped>
  button {
    background: #1976d2;
    border: 0;
    border-radius: 50%;
    bottom: 16px;
    box-shadow:
      0 1px 3px rgba(0,0,0,0.12),
      0 1px 2px rgba(0,0,0,0.24);
    color: #fff;
    height: 64px;
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
import { mapActions, mapMutations, mapState } from 'vuex';

const constraints = { audio: true };

export default {
  computed: {
    ...mapState(['isRecording']),
    buttonText() {
      if (this.waiting) {
        return 'Waiting';
      }
      if (this.isRecording) {
        return 'Recording';
      }
      return 'Record';
    },
  },
  data() {
    return {
      mediaRecorder: null,
      startTime: null,
      waiting: false,
    };
  },
  methods: {
    ...mapActions(['addTrack']),
    ...mapMutations([
      'setTrackInitialData',
      'showTrackNamePrompt',
      'startRecording',
      'stopRecording',
    ]),
    toggleRecord() {
      if (this.isRecording) {
        this.mediaRecorder.stop();
        this.stopRecording();
      } else {
        this.waiting = true;

        navigator.mediaDevices.getUserMedia(constraints)
          .then(stream => {
            const chunks = [];
            const mediaRecorder = new MediaRecorder(stream);

            this.waiting = false;
            this.mediaRecorder = mediaRecorder;

            mediaRecorder.ondataavailable = ({ data }) => chunks.push(data);

            mediaRecorder.onstart = ({ timeStamp }) => this.startTime = timeStamp;

            mediaRecorder.onstop = ({ timeStamp }) => {
              const duration = timeStamp - this.startTime;
              const data = new Blob(chunks, { type: mediaRecorder.mimeType });

              this.setTrackInitialData({
                data,
                duration,
              });
              this.showTrackNamePrompt();
            };

            mediaRecorder.start();
            this.startRecording();
          })
          .catch(err => console.log(err));
      }
    },
  },
};
</script>
