// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import utils from './utils/util';
import config from './config/config';

Object.defineProperty(Vue.prototype, '$_utils', { value: utils });
Object.defineProperty(Vue.prototype, '$_config', { value: config });

Vue.use(VueAxios, axios);
Vue.use(Vuex);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
