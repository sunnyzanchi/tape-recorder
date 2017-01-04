// @flow
/*****************/
/* Tape Recorder */
/* Eric Zanchi   */
/*****************/

import Vue from 'vue';
// Pages
import Main from './Pages/Main.vue';
Vue.component(Main);

import { MdButton,
         MdCore,
         MdToolbar,
         MdIcon,
         MdList,
         MdListItem } from 'vue-material';
  Vue.use(MdCore);
  Vue.use(MdButton);
  Vue.use(MdIcon);
  Vue.use(MdToolbar);
  Vue.use(MdList);

Vue.material.registerTheme('default', {
    primary: 'blue',
    accent: 'red',
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
