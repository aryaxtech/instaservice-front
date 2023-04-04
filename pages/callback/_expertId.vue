<template>
  <div class="single-expert-card">
    <FeaturedExpertCard
      v-if="expert"
      :key="expert.id"
      :expert="expert"
    />
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import FeaturedExpertCard from "~/components/FeaturedExpertCard";
import expertApi from "~/api/expertApi";
import clientApi from "~/api/clientApi";

export default {
  layout: "emptyhero",
  components: {FeaturedExpertCard},
  async asyncData({store, route, params, error}) {
    const defaultLanguage = store.getters['language/getDefaultLanguage'];
    try {
      const expertResult = await expertApi.getExpertById(params.expertId, defaultLanguage);
      return {expert: expertResult.data};
    } catch (e) {
      error({statusCode: 404, message: e.response.data.errors});
    }
  },
  data() {
    return {
      expert: {},
      order: {},
    }
  },
  computed: {
    ...mapGetters({
      order: 'client/getOrder',
    })
  },
  async mounted() {
    this.order = JSON.parse(localStorage.getItem('order'));
    localStorage.setItem('canCall', true);
  },
}
</script>

<style scoped>
.single-expert-card {
  display: flex;
  justify-content: center;
  padding: 30px 0;

}
</style>
