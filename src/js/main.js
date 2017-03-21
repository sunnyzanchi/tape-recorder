// @flow
/*****************/
/* Tape Recorder */
/* Eric Zanchi   */
/*****************/

import Vue from 'vue';
import router from './router';

import VueMaterial from 'vue-material';
Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
    primary: 'blue',
    accent: 'orange',
    warn: 'red',
    background: 'white'
});

const app = new Vue({
  router,
  el: '#app'
});

/* Service Worker registration */
import swSetup from './sw-setup';
swSetup();
