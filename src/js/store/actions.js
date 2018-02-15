import * as db from '../db';

export default {
  async addTrack({ dispatch }, track) {
    await db.addTrack(track);
    dispatch('getTracks');
  },
  async getTracks({ commit }) {
    commit('updateTracks', await db.getTracks());
  },
};
