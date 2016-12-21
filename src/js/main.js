// @flow
/*****************/
/* Tape Recorder */
/* Eric Zanchi   */
/*****************/

import Vue from 'vue';
import VueMaterial from 'vue-material';
Vue.use(VueMaterial);
// Pages
import Main from './Pages/Main.vue';

Vue.component(Main);

const app = new Vue({
  el: '#app',
  data: {
    page: Main
  }
});

/* Service Worker registration */
import swSetup from './sw-setup';
swSetup();
