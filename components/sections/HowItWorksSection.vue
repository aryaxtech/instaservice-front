<template>
  <section class="how-it-works">
    <div class="how-it-works__left">
      <p class="how-it-works__left__little-title">{{ $t('howItsWorks') }}</p>
      <h1 class="how-it-works__left__title">
        {{ $t('findTherapist') }}
      </h1>
      <div class="how-it-works__left__accordion">
        <HowItWorksItem
          v-for="(item, index) in items"
          :key="index"
          :info="item"
        />
      </div>
    </div>
    <div class="how-it-works__right">
      <div class="how-it-works__right__video">
        <img src="/img/index/how-it-works/placeholder.png" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
import HowItWorksItem from '~/components/HowItWorksItem.vue';

export default {
  components: { HowItWorksItem },
  data: () => ({
    items: [
      {
        number: 1,
        text: 'Search the service You need',
        bg: '#F6EBFF',
        textColor: '#8E22E2',
      },
      {
        number: 2,
        text: 'Select the expert which is Online',
        bg: '#E7E9FF',
        textColor: '#2B3DC7',
      },
      {
        number: 3,
        text: '',
        bg: '#E9FFEF',
        textColor: '#3DCD65',
      },
    ],
  }),
  mounted() {
    this.items[0].text = this.$t('clickCall');
    this.items[1].text = this.$t('clickCall');
    this.items[2].text = this.$t('clickCall');
  }
};
</script>

<style lang="scss" scoped>
.how-it-works {
  max-width: 85%;
  margin: 70px auto;
  display: flex;
  justify-content: space-between;

  &__left {
    display: flex;
    width: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    @include rwdmax(1360px) {
      width: 100%;
    }

    gap: 20px;

    &__little-title {
      color: $purpleColor;
      font-size: 18px;
    }

    &__title {
      color: $darkColor;
      font-size: 40px;
      font-weight: 600;
    }

    &__accordion {
      &__text:hover {
        display: block;
      }

      &__btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #444;
        cursor: pointer;
        padding: 18px;
        width: 645px;
        border: none;
        text-align: left;
        border-radius: 20px;
        box-shadow: 0px 7px 22px rgba(143, 134, 196, 0.07);
        transition: box-shadow 0.3s ease-in-out;
      }

      &__btn:hover {
        box-shadow: 0px 10px 29px rgba(62, 53, 120, 0.14);
      }

      &__btn1__number,
      &__btn2__number,
      &__btn3__number {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;

        & span {
          font-weight: 600;
        }
      }

      &__btn1__number {
        & button {
          padding: 13px 25px;
          background-color: #f6ebff;
          border-radius: 20px;
          color: $purpleColor;
          font-size: 26px;
        }
      }

      &__btn2__number {
        & button {
          padding: 13px 25px;
          background-color: #e7e9ff;
          border-radius: 20px;
          color: #2b3dc7;
          font-size: 26px;
        }
      }

      &__btn3__number {
        & button {
          padding: 13px 25px;
          background-color: #e9ffef;
          border-radius: 20px;
          color: #3dcd65;
          font-size: 26px;
        }
      }
    }
  }

  &__right {
    @include rwdmax(1360px) {
      display: none;
    }

    &__video {
      & img,
      video {
        width: 500px;
        height: 450px;
        border-radius: 40px;
      }
    }
  }
}
</style>
