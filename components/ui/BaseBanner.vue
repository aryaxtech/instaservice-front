<template>
  <div class="banner">
    <p>
      {{ title }}
      <span>
        {{ subTitle }}
      </span>
    </p>
    <nuxt-link to="/">
      <img class="banner__arrow" src="/img/expert-one/arrow.svg" alt="arrow"/>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
  height: 180px;
  background-color: #5f4bdb;

  &__img {
    position: relative;
    z-index: 0;
    width: 100%;
  }

  p {
    position: absolute;
    font-size: 50px;
    font-weight: 800;
    color: $whiteColor;
    letter-spacing: 2px;
    text-align: center;
    @include rwdmax(450px) {
      font-size: 19px;
      //display: none;
    }
    span {
      display: block;
      text-align: center;
      font-size: 30px;
    }
  }

  &__arrow {
    display: block;
    position: absolute;
    top: 10%;
    left: 7.5%;
    background: $whiteColor;
    padding: 15px;
    border-radius: 20px;
    @include rwdmax(325px) {
      padding: 5px;
    }
  }
}
</style>
