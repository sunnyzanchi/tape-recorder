// @flow
/*****************/
/* Tape Recorder */
/* Eric Zanchi   */
/*****************/

import Vue from 'vue';
// Pages
import Main from './Pages/Main.vue';
Vue.component(Main);

import { MdBackdrop,
         MdButton,
         MdCore,
         MdToolbar,
         MdIcon,
         MdList,
         MdListItem,
         MdMenu,
         MdSidenav,
         MdTabs,
         MdWhiteframe } from 'vue-material';
Vue.use(MdCore);
Vue.use(MdBackdrop);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdToolbar);
Vue.use(MdList);
Vue.use(MdMenu);
Vue.use(MdSidenav);
Vue.use(MdTabs);
Vue.use(MdWhiteframe);


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
