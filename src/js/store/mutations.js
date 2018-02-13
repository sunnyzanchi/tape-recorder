/* eslint-disable no-param-reassign */
export default {
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
