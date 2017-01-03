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
import Dexie from 'dexie';

export default {
  components: {},
  computed: {
    /* Returns the text for which icon to use */
    icon(){
      switch(this.recordStatus){
        case 'ready':
          return 'mic';
        case 'recording':
          return 'pause';
      }
    }
  },
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
          const constraints = {audio: true};

          // Success function
          const onSuccess = function(stream){
            console.log(stream);
            const chunks = [];
            self.mediaRecorder = new MediaRecorder(stream);
            self.mediaRecorder.start();

            self.mediaRecorder.ondataavailable = function(e){
              chunks.push(e.data);
            }

            // When the recording stops
            self.mediaRecorder.onstop = function(e){
              const blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
              console.log(blob);
              console.log(stream);

              var audio = document.createElement('audio');
              audio.setAttribute('controls', '');
              var audioURL = window.URL.createObjectURL(blob);
              audio.src = audioURL;
              document.body.appendChild(audio);
              console.log(audioURL);
            }
          }

          // Failure function
          const onFailure = function(err){
            console.log('Error occurred getting user media', err);
          }

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
