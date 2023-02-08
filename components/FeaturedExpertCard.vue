<template>
  <v-slide-item>
    <div class="all-experts__container__cards__block">
      <nuxt-link
        class="expert-link"
        :to="{ path: `/${$i18n.locale}/expert/${expert.category.slug}/${expert.slug}` }"
      >
        <div class="all-experts__container__cards__block__photo">
          <img :src="expert.avatar" alt="photo"/>
          <div
            :class="{
              'all-experts__container__cards__block__photo__online':
                 expert.available,
              'all-experts__container__cards__block__photo__offline':
                !expert.available,
            }"
          >
            {{ expert.available ? $t('online') : $t('unavailable') }}
          </div>
        </div>
        <div class="all-experts__container__cards__block__info">
          <p class="all-experts__container__cards__block__info__name">
            {{ expert.name }}
          </p>
          <p
            v-if="expert.profession"
            class="all-experts__container__cards__block__info__proffesion"
          >
            {{ expert.profession }}
          </p>
          <div class="all-experts__container__cards__block__info__rating" v-if="expert.rating">
            <v-rating
              color="#F4C95D"
              background-color="#F4C95D"
              readonly
              hover
              length="5"
              :value="Number(expert.rating)"
            >
            </v-rating>
            <p
              class="all-experts__container__cards__block__info__rating__number"
            >
              {{ expert.rating }}
            </p>
          </div>
        </div>
        <div class="all-experts__container__cards__block__more-info">
          <div v-if="expert.region"
               class="all-experts__container__cards__block__more-info__text">
            <span>{{ $t('from') }}</span>
            <p>{{ expert.region }}</p>
          </div>
          <div class="all-experts__container__cards__block__more-info__text">
            <span>{{ $t('memberSince') }}</span>
            <p>
              {{ expert.createdAt }}
            </p>
          </div>
          <div class="all-experts__container__cards__block__more-info__text"
               v-if="expert.price">
            <span>{{ $t('rate') }}</span>
            <p>$ {{ expert.price }} /hr</p>
          </div>
          <div class="all-experts__container__cards__block__more-info__text"
               v-if="expert.language">
            <span>{{ $t('languages') }}</span>
            <p>{{ expert.language }}</p>
          </div>
          <div class="all-experts__container__cards__block__more-info__text"
               v-if="expert.experience">
            <span>{{ $t('experience') }}</span>
            <p>{{ expert.experience }}</p>
          </div>
          <div v-if="expert.parameters">
            <div class="all-experts__container__cards__block__more-info__text"
                 v-if="expert.parameters.duration">
              <span>{{ $t('duration') }}</span>
              <p>{{ expert.parameters.duration }}</p>
            </div>
            <div class="all-experts__container__cards__block__more-info__text"
                 v-if="expert.parameters.consultation">
              <span>{{ $t('firstFreeFonsultation') }}</span>
              <p>{{ expert.parameters.consultation }}</p>
            </div>
          </div>
          <div class="all-experts__container__cards__block__more-info__text">
            <span>{{ $t('latestReview') }}</span>
            <p>{{ expert.updatedAt }}</p>
          </div>
        </div>
      </nuxt-link>
      <div class="all-experts__btns">
        <a
          v-show="expert.available"
          class="all-experts__btn online"
          @click="call(expert)">
          {{ $t('call') }}
        </a>
        <nuxt-link :to="`/${$i18n.locale}`" class="all-experts__btn">{{ $t('schedule') }}</nuxt-link>
      </div>
    </div>
  </v-slide-item>
</template>

<script>
export default {
  props: {
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
.online {
  background: #219653 !important;
}

.all-experts {
  color: #1f2131 !important;

  &__btns {
    margin-top: 10px;
    padding-bottom: 10px;
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  &__btn {
    background: $purpleColor;
    padding: 15px 30px;
    color: $whiteColor;
    font-size: $fs;
    font-weight: 700;
    border-radius: 60px;
    box-shadow: 0px 5px 29px rgba(62, 53, 120, 0.14);
  }

  &__container {
    &__cards {
      margin-top: 50px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-items: center;
      gap: 45px;

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

          &__offline {
            color: $whiteColor;
            font-size: 14px;
            font-weight: 700;
            background-color: rgb(187, 187, 187);
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
            align-items: center;
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
  }
}

.expert-link {
  color: #1f2131 !important;
}
</style>
