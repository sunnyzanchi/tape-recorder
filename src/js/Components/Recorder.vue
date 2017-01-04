<template lang="html">
  <button class="record ready" @click="toggleRecord">
    <transition name="fade">
      <i class="material-icons"
         v-if="recordStatus === 'ready'"
         key="ready">mic</i>
      <i class="material-icons"
         v-if="recordStatus === 'recording'"
         key="recording">pause</i>
    </transition>
  </button>
</template>
<!--  -->
<script>
import {addTrack} from '../db.js';

export default {
  components: {},
  computed: {},
  created(){
    navigator.getUserMedia = ( navigator.getUserMedia ||
                               navigator.webkitGetUserMedia ||
                               navigator.mozGetUserMedia ||
                               navigator.msGetUserMedia);
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

      if(navigator.getUserMedia){
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
              console.log(e);
              self.mediaRecorder.startTime = e.timeStamp;
            }

            // When the recording stops
            self.mediaRecorder.onstop = function(e){
              var duration = e.timeStamp - self.mediaRecorder.startTime;
              const data = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
              // Add track to the DB
              var name = prompt('Name: ');
              addTrack({name, duration, data});
            }

            self.mediaRecorder.start();
          }

          // Failure function
          const onFailure = function(err){
            console.log('Error occurred getting user media', err);
          }

          // Ask for microphone access
          navigator.getUserMedia(constraints, onSuccess, onFailure);
        }
        else{
          this.recordStatus = 'ready';
          self.mediaRecorder.stop();
        }
      }
      else{
        ;;console.log('getUserMedia not supported');
      }

      ctx.close();
    }
  },
  mounted(){},
  props: []
}
</script>
