import axios from 'axios';
import { DefaultApiInstance } from "~/api/index";

export default {
  /**
   * Fetch featured Experts
   * @returns Promise
   */
  getFeaturedExperts: async () => {
    const url = `/api/experts?recommended=1&active=1`;
    return await DefaultApiInstance.get(url);
  },

  /**
   * Fetch featured Experts
   * @returns Promise
   */
  getOnlineExperts: async () => {
    const url = `/api/experts?available=1&active=1`;
    return await DefaultApiInstance.get(url);
  },

  /**
   * Fetch one expert by category slug and expert slug
   * @param {String} categorySlug
   * @param {String} expertSlug
   * @returns Promise
   */
  getExpertBySlug: async (categorySlug, expertSlug) => {
    const url = `/api/expert/slug/${expertSlug}`;
    return await DefaultApiInstance.get(url);
  },

  /**
   * Fetch experts by category id
   * @param {Integer} categoryId
   * @param {Integer} pageNum
   * @returns Promise
   */
  getExpertsByCategory: async (categoryId, pageNum) => {
    const url = `/api/experts?category_id=${categoryId}&active=1&page=${pageNum}`;
    return await DefaultApiInstance.get(url);
  },

  /**
   * Fetch experts by search text
   * @param {String} searchText
   * @returns Promise
   */
  searchExpert: async (searchText, pageNum) => {
    const url = `/api/experts/search/?search=${searchText}&page=${pageNum}`;
    return await DefaultApiInstance.get(url);
  },

  setExpert: async (expert) => {
    return await axios.post('https://back.instaservice.io/api/expert', expert, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
