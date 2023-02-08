<template>
  <div class="hero">
    <div class="hero__container">
      <div class="hero__left">
        <div class="hero__info">
          <p class="hero__text">{{ $t('findYour') }}</p>
          <p class="hero__text--purple">{{ $t('psychologist') }}</p>
          <div class="hero__text">
            {{ $t('andGetInTouch') }} <span class="hero__text--purple">{{ $t('now') }}</span>
          </div>
        </div>
        <p class="hero__description">
          {{ $t('bannerTitle') }}
        </p>
        <div class="search">
          <input
            v-model="searchValue"
            type="search"
            :placeholder="$t('searcHere')"
            class="search__input"
          />
          <button class="search__button" @click="search">{{ $t('search') }}</button>
        </div>
      </div>
      <div class="hero__right">
        <div>
          <img class="hero__photo" src="/img/index/main/woman.png" alt=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      searchValue: '',
    };
  },
  methods: {
    search() {
      this.$router.push(`/search?find=${this.searchValue}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.hero {
  // .hero__container

  background: $bckgColor;

  &__container {
    max-width: 85%;
    margin: 0 auto;
    padding: 20px 0px 20px;
    justify-content: space-between;
    display: flex;
    @include rwdmax(1081px) {
      flex-direction: column-reverse;
    }
    align-items: center;
  }

  // .hero__left

  &__left {
    @include rwdmax(1081px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  // .hero__text

  &__text {
    color: $darkColor;
    font-size: 55px;
    font-weight: 600;
    margin-bottom: 10px;
    @include rwdmax(710px) {
      display: inline;
      font-size: 18px !important;
    }
  }

  &__info {
    @include rwdmax(710px) {
      display: block !important;
      max-width: 500px;
      margin: 0 auto;
      text-align: center;
      font-size: 18px !important;
    }

    @include rwdmax(1081px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  // .hero__text--purple

  &__text--purple {
    margin-bottom: 10px;
    font-size: 55px;
    font-weight: 600;
    color: $purpleColor;
    @include rwdmax(710px) {
      display: inline;
      font-size: 18px !important;
    }
  }

  // .hero__description

  &__description {
    font-size: $fs;
    color: $darkColor;
    font-weight: 500;
    margin-top: 30px;
    @include rwdmax(710px) {
      display: none;
    }
  }

  // .hero__right

  &__right {
  }

  // .hero__photo

  &__photo {
    @include rwdmax(1680px) {
      width: 700px;
    }
    @include rwdmax(1522px) {
      width: 600px;
    }

    @include rwdmax(1200px) {
      width: 500px;
    }
    @include rwdmax(500px) {
      width: 350px;
    }
    @include rwdmax(380px) {
      width: 250px;
      margin-bottom: 20px;
    }
  }
}

.search {
  margin-top: 30px;
  position: relative;
  align-items: center;
  font-size: $fs;
  @include rwdmax(710px) {
    max-width: 500px;
    display: flex;
    flex-direction: column;
  }
  @include rwdmax(500px) {
    display: flex;
    flex-direction: column;
  }

  // .search__input

  &__input {
    padding-left: 20px;
    font-size: inherit;
    width: 500px;
    height: 65px;
    background: $whiteColor;
    box-shadow: 0px 19px 84px rgba(0, 0, 0, 0.04);
    border-radius: 60px;
    @include rwdmax(710px) {
      width: 400px;
      height: 55px;
    }
    @include rwdmax(500px) {
      width: 350px;
    }
    @include rwdmax(380px) {
      width: 298px;
    }
  }

  // .search__button

  &__button {
    top: 7px;
    position: absolute;
    padding: 15px 60px 15px 60px;
    background: $purpleColor;
    border-radius: 30px;
    color: $whiteColor;
    font-size: inherit;
    font-family: inherit;
    transform: translateX(-185px);
    transition: background 0.3s ease-in-out;
    @include rwdmax(710px) {
      position: relative;
      transform: none;
      width: 100%;
      height: 55px;
      margin-bottom: 20px;
      margin-top: 14px;
    }
    @include rwdmax(500px) {
      width: 350px;
    }
    @include rwdmax(380px) {
      width: 298px;
    }
  }

  &__button:hover {
    background-color: #5241c1;
  }
}
</style>
