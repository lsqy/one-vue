import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'

Vue.use(Vuex);

const state = {

};

export default new Vuex.Store({
    state,
    actions,
    getters,
    modules: {
      cart
    },
    strict: process.env.NODE_ENV !== 'production',
});