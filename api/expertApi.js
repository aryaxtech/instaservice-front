import axios from 'axios';
import { DefaultApiInstance } from "~/api/index";

export default {
  /**
   * Fetch featured Experts
   * @returns Promise
   */
  getFeaturedExperts: async (languageAbbr) => {
    const url = `/api/experts?recommended=1&active=1&lang=${languageAbbr}`;
    return await DefaultApiInstance.get(url);
  },

  /**
   * Fetch featured Experts
   * @returns Promise
   */
  getOnlineExperts: async (languageAbbr) => {
    const url = `/api/experts?available=1&active=1&lang=${languageAbbr}`;
    return await DefaultApiInstance.get(url);
  },

  /**
   * Fetch one expert by category slug and expert slug
   * @param {String} categorySlug
   * @param {String} expertSlug
   * @returns Promise
   */
  getExpertBySlug: async (categorySlug, expertSlug, languageAbbr) => {
    const url = `/api/expert/slug/${expertSlug}?lang=${languageAbbr}`;
    return await DefaultApiInstance.get(url);
  },

  /**
   * Fetch one expert by id
   * @param {String} categorySlug
   * @param {String} expertSlug
   * @returns Promise
   */
  getExpertById: async (id, languageAbbr) => {
    const url = `/api/expert/${id}?lang=${languageAbbr}`;
    return await DefaultApiInstance.get(url);
  },

  /**
   * Fetch experts by category id
   * @param {Integer} categoryId
   * @param {Integer} pageNum
   * @returns Promise
   */
  getExpertsByCategory: async (categoryId, pageNum, languageAbbr) => {
    const url = `/api/experts?category_id=${categoryId}&active=1&page=${pageNum}&lang=${languageAbbr}&show_translation=1`;
    return await DefaultApiInstance.get(url);
  },

  /**
   * Fetch experts by search text
   * @param {String} searchText
   * @returns Promise
   */
  searchExpert: async (searchText, pageNum, languageAbbr) => {
    const url = `/api/experts/search/?search=${searchText}&page=${pageNum}&lang=${languageAbbr}`;
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
