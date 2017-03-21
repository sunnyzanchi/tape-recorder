import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Main from 'Pages/Main.vue';

const routes = [
  {path: '/', component: Main}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
