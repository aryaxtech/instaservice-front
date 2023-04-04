import {DefaultApiInstance} from "~/api/index";

export default {
  createClient: async (data) => {
    const url = `/api/user`;
    return await DefaultApiInstance.post(url, data);
  },
  createOrder: async (data) => {
    const url = `/api/order`;
    return await DefaultApiInstance.post(url, data);
  },
  getOrderByToken: async (token) => {
    const url = `/api/order/token/${token}?lang=ro`;
    return await DefaultApiInstance.get(url, data);
  },
};
