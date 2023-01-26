import {DefaultApiInstance} from "~/api/index";

export default {
  getServiceByHash: async (data) => {
    const url = `/api/service/hash/${data}`;
    return await DefaultApiInstance.get(url);
  },
  getCollectionBySlug: async (slug) => {
    const url = `/api/collection/slug/${slug}`;
    return await DefaultApiInstance.get(url);
  },
  getExpertServices: async (id) => {
    const url = `/api/services/expert/${id}`;
    return await DefaultApiInstance.get(url);
  }
};