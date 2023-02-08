<template>
  <div>
    <!-- ~ Landing Page ~ -->
    <!-- Crypto Topics Section -->
    <CategorySection/>

    <!-- Experts Section -->
    <OnlineExpertsSection id="fe-1" :title="$t('onlinePsychologists')"/>

    <FeaturedExpertsSection id="fe-2" :title="$t('recommendedTherapists')"/>

    <!-- How it Works Section -->
    <HowItWorksSection/>

    <!-- Become Expert Section -->
    <BecomeExpertSection/>

    <!-- Benefits Section -->
    <BenefitsWorkSection/>

    <!-- Customers Section -->
    <CustomerSection/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import BecomeExpertSection from '~/components/sections/BecomeExpertSection.vue';
import BenefitsWorkSection from '~/components/sections/BenefitsWorkSection.vue';
import CategorySection from '~/components/sections/CategorySection.vue';
import CustomerSection from '~/components/sections/CustomerSection.vue';
import FeaturedExpertsSection from '~/components/sections/FeaturedExpertsSection.vue';
import OnlineExpertsSection from '~/components/sections/OnlineExpertsSection.vue';
import HowItWorksSection from '~/components/sections/HowItWorksSection.vue';

export default {
  name: 'MainPage',
  components: {
    CategorySection,
    FeaturedExpertsSection,
    HowItWorksSection,
    BecomeExpertSection,
    BenefitsWorkSection,
    CustomerSection,
    OnlineExpertsSection,
  },
  watch: {
    async defaultLanguage() {
      await this.fetchCategories();
      await this.fetchFeaturedExperts();
      await this.fetchOnlineExperts();
    }
  },
  computed: {
    ...mapGetters({
      defaultLanguage: 'language/getDefaultLanguage',
    }),
  },
  fetch: async ({store}) => {
    if (store.getters['category/getCategories'].length === 0) {
      await store.dispatch('category/fetchCategories');
    }
    if (store.getters['expert/getFeaturedExperts'].length === 0) {
      await store.dispatch('expert/fetchFeaturedExperts');
    }
    if (store.getters['expert/getOnlineExperts'].length === 0) {
      await store.dispatch('expert/fetchOnlineExperts');
    }
  },
  methods: {
    ...mapActions({
      fetchCategories: 'category/fetchCategories',
      fetchFeaturedExperts: 'expert/fetchFeaturedExperts',
      fetchOnlineExperts: 'expert/fetchOnlineExperts',
    }),
  }
};
</script>

<style lang="scss" scoped></style>
