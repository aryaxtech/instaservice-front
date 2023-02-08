import {DefaultApiInstance} from "~/api/index";

export default {
  getLanguages: async () => {
    const url = `/api/languages`;
    return await DefaultApiInstance.get(url);
  },
};
