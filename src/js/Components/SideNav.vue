<style lang="css">
</style>
<template lang="html">
  <md-sidenav class="md-left" ref="sidenav">

    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Sidenav content</h3>
      </div>
    </md-toolbar>

    <div class="sidenav-content">
      <md-icon>play_arrow</md-icon>
      <span>Metronome</span>

      <md-input-container>
        <label for="bpm">BPM</label>
        <md-input id="bpm"
                  type="number"
                  md-inline
                  v-model="bpm" />
      </md-input-container>

      <label>Meter</label>
      <md-input-container>
        <label>Beats</label>
        <md-input id="beats"
                  type="number"
                  md-inline
                  v-model="meter.beats" />
        <span class="md-error"
              v-show="showNoteValueTooltip">
        Going a little high there!
        </span>
      </md-input-container>

      <md-input-container>
        <label>Note Value</label>
        <md-input id="beats"
                  type="number"
                  md-inline
                  v-model="meter.noteValue" />
        <span class="md-error"
              v-show="showNoteValueTooltip">
        This is usually a multiple of 4
        </span>
      </md-input-container>
    </div>

  </md-sidenav>
</template>

<script>
export default {
  computed: {
    showBeatTooltip(){
      return this.meter.beats > 16;
    },
    showNoteValueTooltip(){
      return this.meter.noteValue % 4 !== 0;
    }
  },
  data(){
    return {
      bpm: 120,
      meter: {
        beats: 4,
        noteValue: 4
      }
    }
  },
  methods: {
    toggle(){
      this.$refs.sidenav.toggle();
    }
  }
}
</script>
