<template>
  <div class="expert-page">
    <BaseBanner :title="''"
                :sub-title="`Psihologi care consulta pe ${collection.name}`"/>
    <div class="expert">
      <v-row v-for="(service, key) in collection.services" :key="key"
             :class="{rowExpertLtr: key % 2 === 0, rowExpertRtl: key % 2 === 1}">
        <v-col class="flex-expert-area flex-expert-video col-md-6 col-12">
          <video :src="service.video" width="80%" controls></video>
        </v-col>
        <v-col md="6" xs="12"  class="flex-expert-area">
          <div class="text-center" v-if="service.expert">
            <FeaturedExpertCard :expert="service.expert"/>
          </div>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
import serviceApi from "~/api/serviceApi";
import BaseBanner from '~/components/ui/BaseBanner.vue';
import FeaturedExpertCard from '~/components/FeaturedExpertCard'

export default {
  name: "_slug",
  layout: () => 'emptyhero',
  components: {BaseBanner, FeaturedExpertCard},
  async asyncData({params, error}) {
    try {
      const result = await serviceApi.getCollectionBySlug(params.slug)
      return {collection: result.data};
    } catch (e) {
      error({statusCode: 404, message: e.response.data.errors});
    }
  },
}
</script>

<style scoped lang="scss">

.expert {
  width: 70%;
  @include rwdmax(730px) {
    width: calc(100% - 40px);
  }
  margin: 0 auto;
  margin-top: -20px;
  padding: 40px;
  position: relative;
  background: #ffffff;
  box-shadow: 0px 0px 28px rgba(62, 53, 120, 0.1);
  border-radius: 18px;
  @include rwdmax(470px) {
    padding: 20px;
  }

  @include rwdmax(390px) {
    width: 100% !important;
    margin: 0 !important;
  }

  .flex-expert-area {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 11px 39px rgba(0, 0, 0, 0.03);
    @include rwdmax(390px) {
      box-shadow: none;
    }
  }

  .rowExpertRtl {
    direction: rtl;
    @include rwdmax(390px) {
      direction: ltr;
      box-shadow: 0px 11px 39px rgba(0, 0, 0, 0.07);
    }
  }

  .rowExpertLtr {
    direction: ltr;
    @include rwdmax(390px) {
      direction: ltr;
      box-shadow: 0px 11px 39px rgba(0, 0, 0, 0.07);
    }
  }

  video {
    border-radius: 15px;
    width: 80%;
    box-shadow: 0px 11px 39px rgba(0, 0, 0, 0.2);
    @include rwdmax(390px) {
      width: 100%;
    }
  }

  .all-experts__container__cards__block:hover {
    box-shadow: none;
  }

}


</style>
