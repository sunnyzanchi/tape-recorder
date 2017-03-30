import Vue from 'vue'
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
    primary: 'blue',
    accent: 'orange',
    warn: 'red',
    background: 'white'
});

import App from './App'
new Vue({
  el: '#app',
  render: h => h(App)
})
