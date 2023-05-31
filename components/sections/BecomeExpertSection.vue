<template>
  <section class="become-expert">
    <div class="become-expert__container">
      <img
        src="/img/index/become-an-expert/bckg.png"
        alt="backgroung image"
        class="become-expert__container__img"
      />
      <div class="become-expert__container__text">
        <h2 class="become-expert__container__text__header">
          <p>{{ $t('areYouInterestedIn') }}</p>
          <p>{{ $t('becomingTherapist') }}</p>
        </h2>

        <nuxt-link :to="`/${$i18n.locale}/auth/register`" class="become-expert__container__text__btn">{{ $t('joinWithUs') }}</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.become-expert {
  margin-top: 60px;
  &__container {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;

    @include rwdmax(1098px) {
      display: flex;
      max-width: 70%;
      margin: 0 auto;
      text-align: center;
      p {
        display: inline;
      }
    }
    &__text {
      @include rwdmax(1098px) {
        position: relative;

        align-items: center;
        margin: 0;
      }
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &__header {
        font-size: 30px;
        font-weight: 600;
        color: white;
        line-height: 1.3;
      }
      &__btn {
        margin-top: 20px;
        color: $whiteColor;
        font-size: 18px;
        font-weight: 700;
        background-color: $purpleColor;
        border-radius: 16px;
        padding: 20px 40px;
      }
    }
    & img {
      @include rwdmax(1098px) {
        display: none;
      }
      width: 85%;
      height: 100%;
    }
  }
}
</style>
