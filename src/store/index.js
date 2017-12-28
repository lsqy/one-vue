import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import index from './modules/index';
import music from './modules/music';

Vue.use(Vuex);

const state = {

};

export default new Vuex.Store({
  state,
  actions,
  getters,
  modules: {
    index,
    music,
  },
  strict: process.env.NODE_ENV !== 'production',
});
