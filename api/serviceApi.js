import {DefaultApiInstance} from "~/api/index";

export default {
  getServiceByHash: async (data, languageAbbr) => {
    const url = `/api/service/hash/${data}?lang=${languageAbbr}`;
    return await DefaultApiInstance.get(url);
  },
  getCollectionBySlug: async (slug, languageAbbr) => {
    const url = `/api/collection/slug/${slug}?lang=${languageAbbr}`;
    return await DefaultApiInstance.get(url);
  },
  getExpertServices: async (id, languageAbbr) => {
    const url = `/api/services/expert/${id}?lang=${languageAbbr}`;
    return await DefaultApiInstance.get(url);
  }
};
