import {DefaultApiInstance} from "~/api/index";

export default {
  setClient: async (data) => {
    const url = `/api/user`;
    return await DefaultApiInstance.post(url, data);
  },
};
