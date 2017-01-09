<template lang="html">
  <div>
    <md-button class="md-fab md-fab-bottom-center md-primary" @click="toggleRecord">
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

              // Pop the dialog to get the name
              bus.$emit(dialogupdate, {name: 'saveTrack', timeStamp: e.timeStamp});

              // When the name is submitted
              bus.$on(dialogsubmit, function({name, timeStamp}){
                console.log(timeStamp);
                console.log(e)
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
