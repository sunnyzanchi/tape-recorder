/* eslint-disable no-param-reassign */
export default {
  hideTrackNamePrompt(state) {
    state.showPrompt = false;
  },
  setTrackInitialData(state, track) {
    state.currentlyAddingTrack = track;
  },
  showTrackNamePrompt(state) {
    state.showPrompt = true;
  },
  startPlaying(state, url) {
    state.playing = url;
  },
  startRecording(state) {
    state.isRecording = true;
  },
  stopPlaying(state) {
    state.playing = false;
  },
  stopRecording(state) {
    state.isRecording = false;
  },
  updateTracks(state, tracks) {
    state.tracks = tracks;
  },
};
