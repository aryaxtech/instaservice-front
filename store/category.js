import categoryApi from '~/api/categoryApi.js';

/**
 * Category Vuex Module
 *
 * Responsible for the categories state
 */

export const state = () => ({
  error: {},
  categories: [],
  currentCategory: {},
});

export const getters = {
  getCategories: (state) => state.categories,
  getCurrentCategory: (state) => state.currentCategory,
  getError: (state) => state.error,
};

export const mutations = {
  setCategories: (state, payload) => {
    state.categories = payload;
  },
  setCurrentCategory: (state, payload) => {
    state.currentCategory = payload;
  },
  setError: (state, payload) => {
    state.error = payload;
  },
};

export const actions = {
  /**
   * Fetch all categories
   * @param {Object} param0 context
   */
  fetchCategories: async ({ commit, rootGetters }) => {
    const defaultLanguage = rootGetters['language/getDefaultLanguage'];
    const languageAbbr = defaultLanguage ? defaultLanguage : 'ro';
    await categoryApi
      .getCategories(languageAbbr)
      .then((responce) => {
        commit('setCategories', responce.data);
        commit('setError', {});
      })
      .catch((err) => {
        commit('setError', err);
      });
  },

  setCurrentCategory({ commit }, { currentCategory }) {
    commit('setCurrentCategory', currentCategory);
  },
};
