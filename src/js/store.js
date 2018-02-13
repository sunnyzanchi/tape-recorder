/* eslint-disable no-param-reassign */
import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import * as db from './db';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions: {
    async getTracks({ commit }) {
      commit('updateTracks', await db.getTracks());
    },
  },
  mutations: {
    updateTracks(state, tracks) {
      state.tracks = tracks;
    },
  },
  state: {
    tracks: [],
  },
});

export default store;
