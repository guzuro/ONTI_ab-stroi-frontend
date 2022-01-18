import Buefy from 'buefy';
import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';
import './assets/styles.scss';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
