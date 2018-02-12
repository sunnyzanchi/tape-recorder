import Vue from 'vue/dist/vue';
import store from './store';
import router from './router';

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  store,
  router,
}).$mount('#app');
