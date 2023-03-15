import authApi from "../api/authApi";

import {SetUserTokenToDefaultApiInstance} from "../api";

export default {
  namespaced: true,

  state: {
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  },

  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.removeItem('token');
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
    },
    deleteToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
    deleteUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },

  actions: {
    onRemoteLogin({commit}, user) {
      // commit('setToken', data.token);
      commit('setUser', user);
      // SetUserTokenToDefaultApiInstance(res.data.token);
    },
    onLogin({commit}, data) {
      return authApi.login(data).then((res) => {
        commit('setToken', res.data.token);
        commit('setUser', res.data.user);
        SetUserTokenToDefaultApiInstance(res.data.token);
      });
    },
    onRegister({commit}, data) {
      return authApi.register(data).then((res) => {
        commit('setToken', res.data.token);
        commit('setUser', res.data.user);
        SetUserTokenToDefaultApiInstance(res.data.token);
      })
    },
    onLogout({commit}) {
      commit('deleteToken');
      commit('deleteUser');
    },
  },
};
