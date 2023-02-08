<template>
  <div class="expert__cards__block">
    <video :src="service.video"
           v-if="service.video"
           width="100%"
           height="660"
           controls></video>
    <div class="expert__cards__block__text">
      <div class="expert__cards__block__text__author">
        <img
          :src="expert.avatar"
          class="expert__cards__block__text__author__img"
          alt="photo"
        />
        <div class="expert__cards__block__text__author__name">
          <p>{{ expert.name }}</p>
          <div class="expert__cards__block__text__author__name__rating" v-if="expert.rating">
            <span>{{ Number(expert.rating) }}</span>
            <v-rating
              background-color="#eee"
              color="warning"
              readonly
              hover
              size="20"
              length="5"
              :value="Number(expert.rating)"
            ></v-rating>
          </div>
        </div>
      </div>
      <div class="expert__cards__block__text__title">
        <p class="text-center">{{ service.name }}</p>
        <p><small>{{ service.description }}</small></p>
      </div>
      <div class="expert__cards__block__text__call">
        <div class="expert__cards__block__text__call__text">
          <span class="expert__cards__block__text__call__price">${{ service.price }}</span>
          <span class="expert__cards__block__text__call__minute">{{ $t('perMinute') }}</span>
        </div>
        <div class="expert__cards__block__text__btns">
          <a href="#" class="expert__cards__block__text__call__btn" @click="call(expert)">{{ $t('call') }}</a>
          <a href="/" class="expert__cards__block__text__call__btn">{{ $t('schedule') }}</a>
        </div>
        <div class="expert__cards__block__text__link">
          <nuxt-link :to="`/${$i18n.locale}/collections/${service.collection.slug}`">
            {{ $t('viewAnotherExperts') }} {{ service.collection.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    service: {
      type: Object,
      required: true,
    },
    expert: {
      type: Object,
      required: true,
    },
  },
  methods: {
    call(expert) {
      this.$nuxt.$emit('call', expert);
    }
  }
};
</script>

<style lang="scss" scoped>
.expert {
  width: 70%;
  margin: -20px auto 0;
  padding: 40px;
  position: relative;
  background: #ffffff;
  box-shadow: 0px 0px 28px rgba(255, 0, 0, 0.1);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;

  &__cards {
    &__block {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0px 8px 24px rgba(31, 31, 51, 0.1);
      border-radius: 10px;
      @include rwdmax(460px) {
        width: 100%;
        //width: 220px;
      }
      @include rwdmax(400px) {
        //width: 260px;
        width: 100%;
      }

      &__img {
        width: 100%;
        object-fit: cover;
        //width: 400px;
        height: 200px;
        border-radius: 10px 10px 0 0;
        @include rwdmax(560px) {
          width: 100%;
        }
        @include rwdmax(460px) {
          width: 100%;
        }
        @include rwdmax(325px) {
          width: 100%;
        }
      }

      &__text {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 20px;

        &__link {
          text-align: center;
          margin-top: 20px;
          width: 70%;

          a {
            color: rgba(0, 0, 0, 0.87);
            font-size: 13px;
            font-weight: 600;
            text-decoration: underline;
          }
        }

        &__btns {
          margin-top: 15px;
          gap: 10px;
          display: flex;
          @include rwdmax(460px) {
            flex-direction: row;
          }

          a {
            @include rwdmax(325px) {
              font-size: 10px;
            }
          }
        }

        &__author {
          display: flex;
          align-items: center;
          gap: 20px;
          @include rwdmax(460px) {
            flex-direction: column;
          }

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
              @include rwdmax(460px) {
                text-align: center;
              }
            }

            &__rating {
              display: flex;
              align-items: center;
              gap: 10px;
              @include rwdmax(325px) {
                flex-direction: column-reverse;
              }
            }
          }
        }

        &__title {
          font-size: $fs;
          font-weight: 600;
          @include rwdmax(460px) {
            text-align: center;
          }
        }

        &__call {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          @include rwdmax(460px) {
            flex-direction: column;
            gap: 15px;
          }

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
            text-align: center;
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

  video {
    border-radius: 15px;
    box-shadow: 0px 11px 39px rgba(0, 0, 0, 0.2);
  }
}
</style>
