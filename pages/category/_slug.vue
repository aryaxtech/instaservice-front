<template>
  <!-- Featured Experts -->
  <v-container fluid ma-0 pa-0>
    <BaseBanner :title="``"/>

    <FeaturedExpertsSection title="Online Psychologists available now"/>

    <!-- All Expert Section -->
    <h1 class="main-header">{{ $t('allPsychologists') }}</h1>
    <div class="local-header-line">
      <BaseHeaderLine/>
    </div>
    <div class="all-experts">
      <div class="all-experts__container">
        <div class="all-experts__container__head">
          <p v-if="experts.length" class="all-experts__container__head__left">
            {{ $t('showing') }} {{ experts.length }} {{ $t('experts') }}
          </p>
          <p v-else class="all-experts__container__head__left">
            {{ $t('expertsNotFound') }}
          </p>
          <div class="all-experts__container__head__right">
            <!-- <div class="all-experts__container__head__right__online">
              <p>Online</p>
              <label
                class="all-experts__container__head__right__online__switch"
              >
                <input type="checkbox" />
                <span
                  class="all-experts__container__head__right__online__slider round"
                >
                </span>
              </label>
            </div> -->
            <div class="all-experts__container__head__right__category">
              <select
                v-model="currentCategory"
                class="all-experts__container__head__right__category__select"
                @change="changeCategory"
              >
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :selected="category.slug === $route.params.slug"
                  :value="category.slug"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="all-experts__container__head__right__filter">
              <a class="all-experts__container__head__right__filter__link">
                <img src="/img/cat-one/all-experts/filter.svg" alt=""/>
              </a>
            </div>
          </div>
        </div>
        <div class="all-experts__container__cards">
          <!-- Expert Card List -->
          <ExpertCardAbout
            v-for="expert in experts"
            :key="expert.id"
            :expert="expert"
          />
          <div ref="intersection" class="observer"></div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import categoryApi from '~/api/categoryApi.js';
import ExpertCardAbout from '~/components/ExpertCardAbout.vue';
import FeaturedExpertsSection from '~/components/sections/FeaturedExpertsSection.vue';
import BaseBanner from '~/components/ui/BaseBanner.vue';
import BaseHeaderLine from '~/components/ui/BaseHeaderLine.vue';

export default {
  components: {
    ExpertCardAbout,
    BaseBanner,
    FeaturedExpertsSection,
    BaseHeaderLine,
  },
  layout: () => 'emptyhero',
  data() {
    return {
      observer: null,
      currentCategory: this.$route.params.slug,
    };
  },
  async fetch({params, store, error}) {
    await categoryApi
      .getCategoryBySlug(params.slug)
      .then(async (response) => {
        await store.dispatch('expert/fetchExpertsByCategory', {
          categoryId: response.data.id,
          page: 1,
        });
        await store.dispatch('category/setCurrentCategory', {
          currentCategory: response.data.name,
        });
      })
      .catch(({response}) => {
        error({statusCode: 404, message: response.data.errors});
      });
    if (store.getters['category/getCategories'].length === 0) {
      await store.dispatch('category/fetchCategories');
    }
    await store.dispatch('expert/fetchFeaturedExperts');
  },
  watch: {
    async defaultLanguage() {
      await categoryApi
        .getCategoryBySlug(this.$route.params.slug)
        .then(async (response) => {
          const categoryId = response.data.id;
          await this.fetchExpertsByCategory({
            categoryId,
            page: 1,
          });
          await this.setCurrentCategory({
            currentCategory: response.data.name,
          });
        })
        .catch(({response}) => {
          error({statusCode: 404, message: response.data.errors});
        });
      await this.fetchCategories();
      await this.fetchFeaturedExperts();
    }
  },
  computed: {
    ...mapGetters({
      defaultLanguage: 'language/getDefaultLanguage',
      experts: 'expert/getExperts',
      expertPage: 'expert/getPage',
      categories: 'category/getCategories',
      currentCategoryName: 'category/getCurrentCategory',
    }),
  },
  mounted() {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.getMoreExperts({
          categoryId: this.currentCategory,
          page: this.expertPage + 1,
        });
      }
    }, options);
    this.observer.observe(this.$refs.intersection);
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    ...mapActions({
      getMoreExperts: 'expert/fetchMoreExpertsByCategory',
      fetchExpertsByCategory: 'expert/fetchExpertsByCategory',
      setCurrentCategory: 'category/setCurrentCategory',
      fetchCategories: 'category/fetchCategories',
      fetchFeaturedExperts: 'expert/fetchFeaturedExperts',
    }),
    changeCategory() {
      this.$router.push(`/category/${this.currentCategory}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.local-header-line {
  display: flex;
  justify-content: center;
  padding-top: 50px;
}

.all-experts {
  &__container {
    width: 70%;
    margin: 70px auto;
    display: flex;
    flex-direction: column;

    @include rwdmax(375px) {
      margin: 0;
      width: 100%;
    }

    &__head {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @include rwdmax(425px) {
        gap: 30px;
        flex-direction: column;
      }

      &__left {
        font-size: 30px;
        font-weight: 600;

        @include rwdmax(425px) {
          font-size: 20px;
        }
      }

      &__right {
        display: flex;
        gap: 40px;
        align-items: center;
        font-size: $fs;
        font-weight: 600;

        &__online {
          display: flex;
          align-items: center;
          gap: 10px;

          &__switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
          }

          &__switch input {
            display: none;
          }

          &__slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: 0.4s;
            transition: 0.4s;
          }

          &__slider:before {
            position: absolute;
            content: '';
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
          }

          input:checked + &__slider {
            background-color: $purpleColor;
          }

          input:focus + &__slider {
            box-shadow: 0 0 1px $purpleColor;
          }

          input:checked + &__slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
          }

          /* Rounded sliders */
          &__slider.round {
            border-radius: 34px;
          }

          &__slider.round:before {
            border-radius: 50%;
          }
        }

        &__category {
          & select {
            font-size: 18px;
            font-weight: 500;
            background-color: #fff;
            border: 1px solid #e6e6e6;
            border-radius: 60px;
            padding: 15px 40px 15px 20px;
            appearance: none;
            background-image: url(/img/cat-one/all-experts/arrow.svg);
            background-position: calc(100% - 0.5em) 1.3em;
            background-repeat: no-repeat;

            @include rwdmax(1024px) {
              font-size: 14px;
            }
          }
        }

        &__filter {
          & a {
            background: #e6e6e6;
            border-radius: 60px;
            padding: 18px 20px 20px;
          }
        }
      }
    }

    &__cards {
      margin-top: 50px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-items: center;
      gap: 45px;

      @include rwdmax(1500px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @include rwdmax(1080px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include rwdmax(710px) {
        grid-template-columns: repeat(1, 1fr);
      }

      @include rwdmax(425px) {
        display: flex;
        flex-direction: column;
      }

      &__block {
        width: 300px;
        border-radius: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
        padding: 10px;

        &__photo {
          display: flex;
          flex-direction: column;
          align-items: center;

          &__online {
            color: $whiteColor;
            font-size: 14px;
            font-weight: 700;
            background-color: #30c736;
            border-radius: 39px;
            padding: 10px 20px;
            margin-top: -25px;
          }

          & img {
            width: 110px;
            height: 110px;
            border-radius: 50%;
            object-fit: cover;
          }
        }

        &__info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;

          &__name {
            font-size: 20px;
            font-weight: 600;
          }

          &__proffesion {
            font-size: 15px;
            font-weight: 400;
          }

          &__rating {
            display: flex;
            align-items: flex-end;
            gap: 10px;

            &__number {
              font-size: 16px;
              font-weight: 700;
            }
          }
        }

        &__more-info {
          display: flex;
          flex-direction: column;
          gap: 10px;

          &__text {
            display: flex;
            justify-content: space-between;
            gap: 60px;

            & span {
              font-size: 14px;
              font-weight: 400;
            }

            & p {
              font-size: 14px;
              font-weight: 600;
            }
          }
        }
      }

      &__block:hover {
        box-shadow: 0px 11px 39px rgba(0, 0, 0, 0.07);
      }
    }

    &__pagination {
      margin: 60px auto;
      display: flex;
      gap: 35px;
      align-items: center;

      &__previous,
      &__next {
        display: flex;
        align-items: center;
        gap: 15px;

        & span {
          color: $purpleColor;
          font-size: 18px;
          font-weight: 500;
        }
      }

      &__numbers {
        display: flex;
        gap: 10px;

        & span {
          color: $purpleColor;
          font-size: 18px;
          font-weight: 500;
          padding: 15px 25px;
        }

        & span:hover {
          color: $whiteColor;
          background-color: $purpleColor;
          border-radius: 61px;
        }
      }
    }
  }
}
</style>
