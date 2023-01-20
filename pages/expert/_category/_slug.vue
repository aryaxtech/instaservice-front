<template>
  <div class="expert-page">
    <!-- Banner -->
    <BaseBanner :title="expert.name"
                :sub-title="expert.profession"/>

    <!-- Expert Info -->
    <div class="expert">
      <div v-if="expert.services.length">
        <!--        <h1 class="main-header">Services I offer</h1>-->
        <!--        <BaseHeaderLine/>-->
        <div class="expert__cards">
          <ExpertCardCall
            v-for="(service, index) in expert.services"
            :key="index"
            :service="service"
            :expert="expert"
          />
        </div>
      </div>
      <div class="expert__head">
        <div class="expert__head__left">
          <img :src="expert.avatar" alt=""/>
          <div class="expert__head__left__info">
            <div class="expert__head__left__info__about">
              <div class="expert__head__left__info__about__text">
                <p class="expert__head__left__info__about__text__name">
                  {{ expert.name }}
                </p>
                <p
                  v-if="expert.profession"
                  class="expert__head__left__info__about__text__profession"
                >
                  {{ expert.profession }}
                </p>
                <div class="expert__head__left__info__about__text__rating"
                     v-if="expert.rating">
                  <v-rating
                    background-color="#eee"
                    color="warning"
                    readonly
                    hover
                    size="20"
                    length="5"
                    :value="Number(expert.rating)"
                  ></v-rating>
                  <span>{{ Number(expert.rating) }}</span>
                </div>
              </div>
              <div class="expert__head__left__info__status">
                <p
                  :class="{
                    online: expert.available,
                    offline: !expert.available,
                  }"
                >
                  {{ expert.available ? 'ONLINE' : 'OFFLINE' }}
                </p>
              </div>
            </div>
            <div class="expert__head__left__info__extra">
              <div
                v-if="expert.region"
                class="expert__head__left__info__extra__block">
                <span class="expert__head__left__info__extra__block__label">From</span>
                <span class="expert__head__left__info__extra__block__text">
                  {{ expert.region }}
                </span>
              </div>
              <div
                v-if="expert.language"
                class="expert__head__left__info__extra__block">
                <span class="expert__head__left__info__extra__block__label">Languages</span>
                <span class="expert__head__left__info__extra__block__text">
                  {{ expert.language }}
                </span>
              </div>
              <div
                v-if="expert.experience"
                class="expert__head__left__info__extra__block">
                <span class="expert__head__left__info__extra__block__label">Experience</span>
                <span class="expert__head__left__info__extra__block__text">
                  {{ expert.experience }}
                </span>
              </div>
              <div
                v-if="expert.price"
                class="expert__head__left__info__extra__block">
                <span class="expert__head__left__info__extra__block__label">Price</span>
                <span class="expert__head__left__info__extra__block__text">
                  ${{ expert.price }}
                </span>
              </div>
              <div
                v-if="expert.parameters.duration"
                class="expert__head__left__info__extra__block">
                <span class="expert__head__left__info__extra__block__label">Duration of the consultation</span>
                <span class="expert__head__left__info__extra__block__text">
                  ${{ expert.parameters.duration }}
                </span>
              </div>
              <div
                v-if="expert.parameters.consultation"
                class="expert__head__left__info__extra__block">
                <span class="expert__head__left__info__extra__block__label">The first consultation is free</span>
                <span class="expert__head__left__info__extra__block__text">
                  ${{ expert.parameters.consultation }}
                </span>
              </div>
              <!--              <div class="expert__head__left__info__extra__block">-->
              <!--                <span class="expert__head__left__info__extra__block__label"-->
              <!--                >Member since</span-->
              <!--                >-->
              <!--                <span class="expert__head__left__info__extra__block__text">{{-->
              <!--                    expert.createdAt-->
              <!--                  }}</span>-->
              <!--              </div>-->
              <!--              <div class="expert__head__left__info__extra__block">-->
              <!--                <span class="expert__head__left__info__extra__block__label"-->
              <!--                >Latest Review</span-->
              <!--                >-->
              <!--                <span class="expert__head__left__info__extra__block__text">{{-->
              <!--                    expert.updatedAt-->
              <!--                  }}</span>-->
              <!--              </div>-->
            </div>
          </div>
        </div>
        <div class="expert__head__right">
          <button @click="call(expert)">Call</button>
          <button>Schedule meeting</button>
        </div>
      </div>
      <!-- <div class="expert__tags">
        <CategoryTagItem
          v-for="(tag, index) in tags"
          :key="index"
          :tag-name="tag"
        />
      </div> -->
      <div class="expert__video" v-if="expert.video">
        <video :src="expert.video"
               width="100%"
               controls></video>
      </div>

      <div class="expert__text" v-html="expert.description ">
<!--        <p>-->
<!--          {{ expert.description }}-->
<!--        </p>-->
      </div>

    </div>
  </div>
</template>

<script>
import expertApi from '~/api/expertApi.js';

import CategoryTagItem from '~/components/CategoryTagItem.vue';
import ExpertCardCall from '~/components/ExpertCardCall.vue';
import BaseBanner from '~/components/ui/BaseBanner.vue';
import BaseHeaderLine from '~/components/ui/BaseHeaderLine.vue';

export default {
  components: {BaseBanner, CategoryTagItem, ExpertCardCall, BaseHeaderLine},
  layout: () => 'emptyhero',
  async asyncData({params, error}) {
    return await expertApi
      .getExpertBySlug(params.category, params.slug)
      .then((response) => {
        return {expert: response.data};
      })
      .catch((e) => {
        error({statusCode: 404, message: e.response.data.errors});
      });
  },
  ssr: true,
  data: () => {
    return {
      tags: [
        'Blockchains',
        'Wallets',
        'Investments',
        'Trading',
        'Money Transfers',
      ],
      title: 'Crypto Startup Advisor',
    };
  },
  methods: {
    removeSlashed(text) {
      return text.replace(/\\/g, '');
    },
    call(expert) {
      this.$nuxt.$emit('call', expert);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  @include rwdmax(470px) {
    padding: 20px;
  }

  @include rwdmax(390px) {
    width: 100% !important;
    margin: 0 !important;
  }

  &__head {
    width: 100%;
    display: flex;
    justify-content: space-between;

    @include rwdmax(1800px) {
      flex-direction: column;
    }

    &__left {
      width: 90%;
      display: flex;
      gap: 60px;

      @include rwdmax(1337px) {
        flex-direction: column;
        margin: 0 auto;
      }

      img {
        @include rwdmin(1337px) {
          width: 400px;
          height: 500px;
        }

        object-fit: cover;
        border-radius: 94.5px;
      }

      &__info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 20px;

        @include rwdmax(1337px) {
          align-items: center;
        }

        &__about {
          display: flex;
          gap: 30px;

          @include rwdmax(1337px) {
            flex-direction: column-reverse;
            align-items: center;
          }

          &__text {
            display: flex;
            flex-direction: column;
            gap: 25px;

            @include rwdmax(1337px) {
              text-align: center;
            }

            &__name {
              font-size: 35px;
              font-weight: 600;

              @include rwdmax(325px) {
                font-size: 25px;
              }
            }

            &__rating {
              display: flex;
              align-items: center;
              gap: 10px;
              font-weight: 600;

              @include rwdmax(1337px) {
                justify-content: center;
              }

              @include rwdmax(325px) {
                flex-direction: column;
              }
            }
          }
        }

        &__extra {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;

          @include rwdmax(470px) {
            display: grid;
            align-items: start;
            grid-template-columns: repeat(2, 1fr);
          }

          &__block {
            display: flex;
            flex-direction: column;

            &__label {
              font-size: $fs;
              font-weight: 400;
              margin-bottom: 5px;
            }

            &__text {
              font-size: $fs;
              font-weight: 600;
            }
          }
        }

        &__status {
          & .online {
            color: $purpleColor;
            border: 1px solid $purpleColor;
            border-radius: 39px;
            font-size: 14px;
            font-weight: 700;
            padding: 10px 16px;
          }

          & .offline {
            color: rgb(156, 156, 156);
            border: 1px solid rgb(156, 156, 156);
            border-radius: 39px;
            font-size: 14px;
            font-weight: 700;
            padding: 10px 16px;
          }
        }
      }
    }

    &__right {
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;

      @include rwdmax(1800px) {
        margin-top: 50px;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
      }

      @include rwdmax(540px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
      }

      button {
        background: $purpleColor;
        padding: 15px 30px;
        color: $whiteColor;
        font-size: $fs;
        font-weight: 700;
        border-radius: 60px;
        box-shadow: 0px 5px 29px rgba(62, 53, 120, 0.14);

        @include rwdmax(470px) {
          padding: 15px;
          font-size: 15px;
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-around;

    &-1,
    &-2,
    &-3,
    &-4,
    &-5 {
      color: $purpleColor;
      border: 1px solid #e9e6fe;
      border-radius: 50px;
      padding: 8px 22px;
    }
  }

  &__video {
    width: 100%;

    img {
      width: 100%;
    }
  }

  &__text {
    p {
      font-size: 18px;
      line-height: 1.5;
    }
  }

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 35px;

    @include rwdmax(1790px) {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      justify-content: center;
    }

    &__block {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0px 8px 24px rgba(31, 31, 51, 0.1);
      border-radius: 10px;

      &__img {
        width: 100%;
        border-radius: 10px 10px 0 0;
      }

      &__text {
        display: flex;
        flex-direction: column;
        gap: 40px;
        padding: 20px;

        &__author {
          display: flex;
          align-items: center;
          gap: 20px;

          &__img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 50%;
          }

          &__name {
            display: flex;
            flex-direction: column;
            gap: 10px;

            p {
              font-size: 18px;
              font-weight: 600;
            }

            &__rating {
              display: flex;
              align-items: flex-end;
              gap: 10px;
            }
          }
        }

        &__title {
          font-size: $fs;
          font-weight: 600;
        }

        &__call {
          display: flex;
          justify-content: space-between;
          align-items: center;

          &__price {
            font-size: 19px;
            font-weight: 600;
            margin-right: 20px;
          }

          &__minute {
            font-size: $fs;
            font-weight: 500;
          }

          &__btn {
            color: $whiteColor;
            font-size: $fs;
            font-weight: 700;
            background: $purpleColor;
            padding: 13px 23px;
            border-radius: 39px;
            box-shadow: 0px 10px 29px rgba(62, 53, 120, 0.14);
          }
        }
      }
    }
  }
}
</style>
