// @flow
/*****************/
/* Tape Recorder */
/* Eric Zanchi   */
/*****************/

import Vue from 'vue';
// Pages
import Main from 'Pages/Main.vue';
Vue.component(Main);

import VueMaterial from 'vue-material';
Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
    primary: 'blue',
    accent: 'orange',
    warn: 'red',
    background: 'white'
});

const app = new Vue({
  el: '#app',
  data: {
    page: Main
  }
});

/* Service Worker registration */
import swSetup from './sw-setup';
swSetup();
