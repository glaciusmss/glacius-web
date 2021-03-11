import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import modules from './modules';

Vue.use(Vuex);

export const state = {};

export const getters = {};

export const mutations = {};

export const actions = {
  resetAllState({ commit }) {
    commit('app/RESET_STATE');
    commit('auth/RESET_STATE');
    commit('layout/RESET_STATE');
    commit('setting/RESET_STATE');
    commit('shop/RESET_STATE');
  },
};

export default new Store({
  strict: process.env.NODE_ENV !== 'production',
  modules,
  state,
  getters,
  mutations,
  actions,
});
