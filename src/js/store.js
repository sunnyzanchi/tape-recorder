/* eslint-disable no-param-reassign */
import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  mutations: {
    updateTracks(state, tracks) {
      state.tracks = tracks;
    }
  },
  state: {
    tracks: [],
  },
});

export default store;
