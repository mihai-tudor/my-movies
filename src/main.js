import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import './style/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';

const axiosInstance = axios.create({
  baseURL: `http://localhost:${process.env.PORT_API || '4000'}`,
  headers: { 'Content-type': 'application/json' },
});

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueAxios, axiosInstance);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
