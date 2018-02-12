import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import index from './pages/index.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', component: index}
];

const router = new VueRouter({
  routes
});

export default router;
