import * as db from '../db';

export default {
  async getTracks({ commit }) {
    commit('updateTracks', await db.getTracks());
  },
};
