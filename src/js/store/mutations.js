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
  startRecording(state) {
    state.isRecording = true;
  },
  stopRecording(state) {
    state.isRecording = false;
  },
  updateTracks(state, tracks) {
    state.tracks = tracks;
  },
};
