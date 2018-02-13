import * as db from '../db';

export default {
  async getTracks({ commit }) {
    commit('updateTracks', await db.getTracks());
  },
  async record({ commit }) {
    commit('startRecording');
    await new Promise(resolve => setTimeout(resolve, 1000));
    commit('stopRecording');
  },
};
