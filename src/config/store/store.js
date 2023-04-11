import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setHeaders(state, info) {
      if (info) {
        api.defaults.headers.common['Authorization'] = `${info.token}`;
      } else {
        console.log('to por aqui tbm')
        delete api.defaults.headers.common['Authorization'];
        state.isMenuVisible = false;
      }
    },
    setUser(state, user) {
      state.user = user;

      if (user) {
        api.defaults.headers.common['user_id'] = `${user.id}`;
      } else {
        delete api.defaults.headers.common['user_id'];
      }
    },
  },
  actions: {
    async setUser({ commit }, payload) {
      commit('setUser', payload)
    }
  }
})