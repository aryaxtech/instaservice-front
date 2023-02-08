import languageApi from "~/api/languageApi";

export const state = () => ({
  defaultLanguage: 'ro',
});

export const getters = {
  getDefaultLanguage: (state) => state.defaultLanguage,
};

export const mutations = {
  setDefaultLanguage: (state, language) => {
    state.defaultLanguage = language;
  },
};

export const actions = {
  async setDefaultLanguage({commit}, language) {
    commit('setDefaultLanguage', language);
  },
};
