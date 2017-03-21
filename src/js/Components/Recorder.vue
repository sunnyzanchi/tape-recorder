<style>
  button.record{
    border: 0;
    border-radius: 50%;
    color: $white-text-color;
    font-size: 0;
    height: 56px;
    margin: auto;
    padding: 16px;
    position: relative;
    transition: .2s background;
    width: 56px;
  }
  button.record i{
    left: 50%;
    margin: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  button.record.ready{
    background: $primary-color;
  }
  button.record.ready:hover{
    background: $primary-color-hover;
  }
  .md-button.md-fab.md-fab-bottom-center.pause-button{
    transform: translateX(calc(50% + 20px));
    bottom: 24px;
  }
  .md-has-toast .md-fab.md-fab-bottom-center{
    transform: translateX(-50%) translateY(-40px);
  }
</style>
<!--  -->
<template lang="html">
  <div>
    <md-button class="md-fab md-fab-bottom-center md-primary" @click.native="toggleRecord">
      <transition name="fade">
        <md-icon v-if="recordStatus === 'ready'"
           key="ready">mic</md-icon>
        <md-icon v-if="recordStatus === 'recording'"
           key="recording">stop</md-icon>
      </transition>
    </md-button>
    <!-- <transition name="pause-button">
      <md-button v-show="recordStatus === 'recording'" class="md-fab md-mini md-primary md-fab-bottom-center pause-button">
        <md-icon>pause</md-icon>
      </md-button>
    </transition> -->
  </div>
</template>
<!--  -->
<script>
import {addTrack} from '../db.js';
import {bus, dialogcancel, dialogsubmit, dialogupdate} from '../bus.js';

export default {
  components: {},
  computed: {},
  created(){

    /*
    ** MDN getUserMedia Polyfill
    */

    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {

        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia = (navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia);

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }
  },
  data(){
    return {
      recordStatus: 'ready'
    }
  },
  methods: {
    /* Toggles the recording state */
    toggleRecord(){
      const ctx = new (AudioContext || webkitAudioContext)();
      const self = this;

      if(this.recordStatus === 'ready'){
        this.recordStatus = 'recording';
        // We only need audio, don't need to record video
        const constraints = {audio: true};

        // Success function
        const onSuccess = function(stream){
          const chunks = [];
          self.mediaRecorder = new MediaRecorder(stream);

          // Add chunks so we can build the final blob later
          self.mediaRecorder.ondataavailable = function(e){
            chunks.push(e.data);
          }

          // Record the start timestamp so we can calculate the duration later
          self.mediaRecorder.onstart = function(e){
            self.mediaRecorder.startTime = e.timeStamp;
          }

          // When the recording stops
          self.mediaRecorder.onstop = function(e){
            var duration = e.timeStamp - self.mediaRecorder.startTime;
            const data = new Blob(chunks, {type: self.mediaRecorder.mimeType});

            // Pop the dialog to get the name
            bus.$emit(dialogupdate, {name: 'saveTrack', timeStamp: e.timeStamp});

            // When the name is submitted
            bus.$on(dialogsubmit, function({name, timeStamp}){
              if(e.timeStamp === timeStamp){
                // Add track to the DB
                addTrack({name, duration, data});
                bus.$off(dialogsubmit);
                bus.$off(dialogcancel);
              }
            });

            // If the dialog box is cancelled
            bus.$on(dialogcancel, function(timeStamp){
              if(e.timeStamp === timeStamp){
                bus.$off(dialogsubmit);
                bus.$off(dialogcancel);
              }
            });

          }

          self.mediaRecorder.start();
        }

        // Failure function
        const onFailure = function(err){
          console.log('Error occurred getting user media', err);
        }

        // Ask for microphone access
        navigator.mediaDevices.getUserMedia(constraints)
        .then(onSuccess)
        .catch(onFailure);
      }
      else{
        this.recordStatus = 'ready';
        self.mediaRecorder.stop();
      }


      ctx.close();
    }
  },
  mounted(){},
  props: []
}
</script>
