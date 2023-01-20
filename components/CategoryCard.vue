<template>
  <v-slide-item>
    <nuxt-link :to="`/category/${category.slug}`" class="crypto-topics__all__topic">
      <img class="crypto-topics__topic__icon" :src="category.icon" alt="topic icon" />
      <p class="crypto-topics__topic__name">{{ category.name }}</p>
    </nuxt-link>
  </v-slide-item>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.crypto-topics {
  &__all {
    //display: flex;

    &__topic {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      width: 215px;
      height: 225px;
      box-shadow: 0px 5px 10px rgba(31, 31, 51, 0.3);
      margin-right: 50px;
      border-radius: 20px;
      color: $darkColor;
      font-size: 20px;
      font-weight: 500;
      transition: background-color 0.3s ease-in-out;
      transition: color 0.15s ease-in-out;

      img {
        width: 70%;
      }
    }

    &__topic:hover {
      color: $whiteColor;
      background-color: $purpleColor;
    }
  }
}
</style>
