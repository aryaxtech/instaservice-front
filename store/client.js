import clientApi from "~/api/clientApi";

/**
 * Client Vuex Module
 *
 * Responsible for the clients state
 */

export const state = () => ({
  cookieId: null,
});

export const getters = {
  getCookieId: (state) => state.cookieId,
};

export const mutations = {
  setCookieId: (state, cookie) => {
    state.cookieId = cookie;
  },
};

export const actions = {
  setClient: async ({commit}, data) => {
    await clientApi.setClient(data);
    commit('setCookieId', data.cookie);
  },
};
