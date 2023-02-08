<template>
  <section class="crypto-topics">
    <h1 class="main-header">{{ $t('psychologyTopics') }} </h1>
    <BaseHeaderLine/>
    <div class="crypto-topics__all">
      <v-slide-group style="height: 245px" show-arrows>
        <template #next>
          <svg
            class="slider__right-arrow"
            version="1.1"
            id="icons_1_"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            fill="#5f4bdb"
            viewBox="0 0 128 128"
            style="enable-background: new 0 0 128 128"
            xml:space="preserve"
          >
            <g id="row1_1_">
              <g id="_x31__3_">
                <path
                  class="st2"
                  d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 121.6C32.2 121.6 6.4 95.8 6.4 64S32.2 6.4 64 6.4s57.6 25.8 57.6 57.6-25.8 57.6-57.6 57.6zM49.2 38.4 73.6 64 49.2 89.6h13.5L86.4 64 62.7 38.4H49.2z"
                  id="_x32__2_"
                />
              </g>
            </g>
          </svg>
        </template>
        <template #prev>
          <svg
            version="1.1"
            id="icons_1_"
            fill="#5f4bdb"
            class="slider__left-arrow"
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            viewBox="0 0 128 128"
            style="enable-background: new 0 0 128 128"
            xml:space="preserve"
          >
            <g id="row2_1_">
              <g id="_x31__4_">
                <path
                  class="st2"
                  d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm1.3-82.8L41.6 64l23.6 25.5h13.5L54.4 64l24.4-25.5H65.3z"
                  id="left_3_"
                />
              </g>
            </g>
          </svg>
        </template>
        <CategoryCard
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </v-slide-group>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex';
import CategoryCard from '~/components/CategoryCard.vue';
import BaseHeaderLine from '~/components/ui/BaseHeaderLine.vue';

export default {
  components: {CategoryCard, BaseHeaderLine},
  computed: {
    ...mapGetters({
      categories: 'category/getCategories',
    }),
  },
};
</script>

<style lang="scss" scoped>
.slider__left-arrow {
  width: 40px;
  position: absolute;
  top: -60px;
  right: 120px;
  @include rwdmax(670px) {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 60px;
    text-align: center;
  }
}

.slider__right-arrow {
  position: absolute;
  top: -60px;

  right: 60px;
  width: 40px;
  @include rwdmax(670px) {
    margin-left: auto;
    margin-right: auto;
    left: 60px;
    right: 0;
    text-align: center;
  }
}

.crypto-topics {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 50px;

  &__all {
    display: flex;
    justify-content: center;
    width: 85%;
    @include rwdmax(670px) {
      width: 100%;
      margin-top: 70px;
    }
    // @include rwdmax(1227px) {
    //   display: grid;
    //   grid-template-columns: repeat(3, 1fr);
    // }

    // @include rwdmax(766px) {
    //   grid-template-columns: repeat(2, 1fr);
    // }

    // @include rwdmax(524px) {
    //   grid-template-columns: repeat(1, 1fr);
    // }

    gap: 25px;

    &__topic {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      // background-color: #5241c1;
      width: 220px;
      height: 225px;
      box-shadow: 0px 5px 10px rgba(31, 31, 51, 0.3);
      border-radius: 20px;
      color: $darkColor;
      font-size: 20px;
      font-weight: 500;
      transition: background-color 0.3s ease-in-out;
      transition: color 0.15s ease-in-out;
    }

    &__topic:hover {
      color: $whiteColor;
      background-color: $purpleColor;
    }
  }
}
</style>
