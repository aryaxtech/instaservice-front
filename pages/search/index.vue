<template>
  <div class="search-page">
    <h1 class="main-header">{{ $t('searchPsychologists') }}</h1>
    <div class="local-header-line">
      <BaseHeaderLine/>
    </div>
    <div class="all-experts">
      <div class="all-experts__container">
        <div class="all-experts__container__head">
          <p v-if="searchValue" class="all-experts__container__head__left">
            {{ $t('resultsFor') }} “{{ searchValue }}”
          </p>
          <span
            v-else
            class="all-experts__container__head__left"
            style="margin: 0 auto !important"
          >
            {{ $t('searchEnterData') }} 😒
          </span>
          <div class="all-experts__container__head__right"></div>
        </div>
        <div v-if="experts.length !== 0" class="all-experts__container__cards">
          <ExpertCardAbout
            v-for="expert in experts"
            :key="expert.id"
            :expert="expert"
          />
        </div>
        <h1
          v-if="experts.length === 0 && searchValue"
          style="display: flex; margin-top: 20px"
        >
          {{ $t('searchNotFound') }}
        </h1>
        <div id="intersectio-observer" ref="intersection"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import ExpertCardAbout from '~/components/ExpertCardAbout.vue';
import BaseHeaderLine from '~/components/ui/BaseHeaderLine.vue';

export default {
  components: {ExpertCardAbout, BaseHeaderLine},
  layout: () => 'emptyhero',
  data: () => {
    return {
      observer: null,
    };
  },
  async fetch({route, store, error}) {
    await store
      .dispatch('expert/fetchSearchExperts', {
        searchText: route.query.find,
      })
      .catch((err) => {
        error({statusCode: 404, message: err.response.data.errors.message});
      });
    store.dispatch('search/setSearchValue', {
      searchValue: route.query.find,
    });
  },
  computed: {
    ...mapGetters({
      experts: 'expert/getExperts',
      expertPage: 'expert/getPage',
      error: 'expert/getError',
      searchValue: 'search/getSearchValue',
    }),
  },
  mounted() {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.getMoreSearchExpert({
          searchValue: this.searchValue,
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
      getExperts: 'expert/fetchSearchExperts',
      getMoreSearchExpert: 'expert/fetchMoreSearchExperts',
    }),
  },
};
</script>

<style lang="scss" scoped>
.local-header-line {
  display: flex;
  justify-content: center;
  padding-top: 30px;
}

.search-page {
  padding-top: 34px;
}

.all-experts {
  &__container {
    width: 85%;
    margin: 70px auto;
    display: flex;
    flex-direction: column;

    &__head {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &__left {
        font-size: 30px;
        font-weight: 600;
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
            padding: 15px 20px 15px 20px;
            appearance: none;
            background-image: url(/img/cat-one/all-experts/arrow.svg);
            background-position: calc(100% - 1.1em) 1.05em;
            background-repeat: no-repeat;
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
