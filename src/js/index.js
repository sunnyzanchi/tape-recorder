import Vue from 'vue/dist/vue';
import './getUserMedia.polyfill';
import router from './router';
import store from './store';

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  store,
  router,
}).$mount('#app');
