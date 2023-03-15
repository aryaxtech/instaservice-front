import {DefaultApiInstance} from "~/api/index";

export default {
  login: async (loginData) => {
    const url = `/api/user/login`;
    return await DefaultApiInstance.post(url, loginData);
  },

  register: async (registerData) => {
    const url = `/api/user/register`;
    return await DefaultApiInstance.post(url, registerData);
  },
};
