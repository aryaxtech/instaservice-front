import {DefaultApiInstance} from "~/api/index";

export default {
  /**
   * Fetch all categories
   * @returns Promise
   */
  getCategories: async (languageAbbr) => {
    const url = `/api/categories?lang=${languageAbbr}`;
    return await DefaultApiInstance.get(url);
  },

  /**
   * Fetch category by slug
   * @param {String} categorySlug
   * @returns Promise
   */
  getCategoryBySlug: async (categorySlug) => {
    const url = `/api/category/slug/${categorySlug}`;
    return await DefaultApiInstance.get(url);
  },
};
