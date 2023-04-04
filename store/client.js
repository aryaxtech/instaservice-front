import clientApi from "~/api/clientApi";

/**
 * Client Vuex Module
 *
 * Responsible for the clients state
 */

export const state = () => ({
  cookieId: null,
  client: {},
  order: {},
});

export const getters = {
  getCookieId: (state) => state.cookieId,
  getClient: (state) => state.client,
  getOrder: (state) => state.order,
};

export const mutations = {
  setCookieId: (state, cookie) => {
    state.cookieId = cookie;
  },
  setClient: (state, client) => {
    state.client = client;
  },
  setOrder: (state, order) => {
    state.order = order;
  },
};

export const actions = {
  setClient: async ({commit}, data) => {
    const client = await clientApi.createClient(data);
    commit('setCookieId', data.cookie);
    commit('setClient', client.data);
  },
  setOrder: async ({commit}, data) => {
    const order = await clientApi.createOrder(data);
    commit('setOrder', order.data);
  },
  getOrderByToken: async ({commit}, token) => {
    const order = await clientApi.getOrderByToken(token);
    console.log(order);
    // commit('setOrder', order.data);
  },
};
