import Vue from 'vue/dist/vue.js';
import store from './store';
import router from './router';

const app = new Vue({
  store,
  router
}).$mount('#app');
