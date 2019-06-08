import Vue from 'vue';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import './style/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './axios';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
