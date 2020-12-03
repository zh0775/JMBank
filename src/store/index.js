import Vue from 'vue';
import Vuex from 'vuex';
import dynamicRouter from './modules/dynamicRouter'
import page from './modules/page'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dynamicRouter,
    page
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})