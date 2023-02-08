import expertApi from '~/api/expertApi.js';

/**
 * Expert Vuex Module
 *
 * Responsible for the expert state
 */

export const state = () => ({
  featuredExperts: [],
  onlineExperts: [],
  experts: [],

  /**
   * Expert fetch meta
   *
   * current_page, from, to, last_page, etc..
   */
  meta: {},
  page: 0,

  // error
  error: {},
});

export const getters = {
  getFeaturedExperts: (state) => state.featuredExperts,
  getOnlineExperts: (state) => state.onlineExperts,
  getExperts: (state) => state.experts,
  getMeta: (state) => state.meta,
  getPage: (state) => state.page,
  getError: (state) => state.error,
};

export const mutations = {
  setFeaturedExperts: (state, payload) => {
    state.featuredExperts = payload;
  },

  setOnlineExperts: (state, payload) => {
    state.onlineExperts = payload;
  },

  setExperts: (state, payload) => {
    state.experts = payload;
  },

  setPage: (state, payload) => {
    state.page = payload;
  },

  setMeta: (state, payload) => {
    state.meta = payload;
  },

  setError: (state, payload) => {
    state.error = payload;
  },

  clearError: (state) => {
    state.error = {};
  },

  clearExperts: (state) => {
    state.experts = [];
  },
};

export const actions = {
  /**
   * Fetch Featured Experts
   * @param {Object} param0 context
   */
  fetchFeaturedExperts: async ({ commit, rootGetters }) => {
    const defaultLanguage = rootGetters['language/getDefaultLanguage'];
    const languageAbbr = defaultLanguage ? defaultLanguage : 'ro';
    await expertApi
      .getFeaturedExperts(languageAbbr)
      .then((response) => {
        commit('setFeaturedExperts', response.data.data);
        commit('clearError');
      })
      .catch((err) => {
        commit('setError', err);
      });
  },

  /**
   * Fetch Online Experts
   * @param {Object} param0 context
   */
  fetchOnlineExperts: async ({ commit, rootGetters }) => {
    const defaultLanguage = rootGetters['language/getDefaultLanguage'];
    const languageAbbr = defaultLanguage ? defaultLanguage : 'ro';
    await expertApi
      .getOnlineExperts(languageAbbr)
      .then((response) => {
        commit('setOnlineExperts', response.data.data);
        commit('clearError');
      })
      .catch((err) => {
        commit('setError', err);
      });
  },

  /**
   * Fetch expert by category id
   * @param {Object} param0 context
   * @param {Object} param1 fetch params
   */
  fetchExpertsByCategory: async ({ commit, rootGetters }, { categoryId, page }) => {
    const defaultLanguage = rootGetters['language/getDefaultLanguage'];
    const languageAbbr = defaultLanguage ? defaultLanguage : 'ro';
    await expertApi
      .getExpertsByCategory(categoryId, page, languageAbbr)
      .then((response) => {
        commit('setExperts', response.data.data);
        commit('setMeta', response.data.meta);
        commit('setPage', response.data.meta.page);
        commit('clearError');
      })
      .catch((err) => {
        commit('setError', err);
        commit('setExperts', []);
      });
  },

  /**
   * Fetch more experts for lazy-loading
   * @param {Object} param0 context
   * @param {Object} param1 fetch params
   */
  fetchMoreExpertsByCategory: async (
    { state, commit },
    { categoryId, page }
  ) => {
    if (state.meta.last_page >= page) {
      commit('setPage', page);
      await expertApi
        .getExpertsByCategory(categoryId, page)
        .then((response) => {
          commit('setExperts', [...state.experts, ...response.data.data]);
          commit('setMeta', response.data.meta);
          commit('clearError');
        })
        .catch((err) => {
          commit('setError', err);
          commit('setExperts', []);
        });
    }
  },

  /**
   * Fetch expert by search param
   * @param {Object} param0 context
   * @param {Object} param1 fetch params
   */
  fetchSearchExperts: async ({ commit, rootGetters }, { searchText }) => {
    const defaultLanguage = rootGetters['language/getDefaultLanguage'];
    const languageAbbr = defaultLanguage ? defaultLanguage : 'ro';
    await expertApi
      .searchExpert(searchText, 1, languageAbbr)
      .then((response) => {
        commit('setExperts', response.data.data);
        commit('setMeta', response.data.meta);
        commit('setPage', 1);
        commit('setError', {});
      })
      .catch((err) => {
        commit('clearExperts');
        commit('setError', err);
      });
  },

  fetchMoreSearchExperts: async ({ state, commit }, { searchValue, page }) => {
    if (state.meta.last_page >= page) {
      commit('setPage', page);
      await expertApi
        .searchExpert(searchValue, page)
        .then((response) => {
          commit('setExperts', [...state.experts, ...response.data.data]);
          commit('setMeta', response.data.meta);
          commit('clearError');
        })
        .catch((err) => {
          commit('setError', err);
          commit('setExperts', []);
        });
    }
  },

  clearExperts: ({ commit }) => {
    commit('clearExperts');
  },
};
