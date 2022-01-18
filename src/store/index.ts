import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './modules/user/state';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userState: {},
  },
  mutations: {},
  actions: {},
  modules: {
    userModule,
  },
});
