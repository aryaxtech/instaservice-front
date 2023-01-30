<template>
  <v-footer class="footer">
    <div class="footer__container">
      <div class="footer__container__left">
        <img src="@/static/img/white-logo.png" style="width: 300px" alt="" />

        <div class="footer__container__right">
          <div class="footer__container__right__block">
            <p class="footer__container__right__block__name">Experts</p>
            <nuxt-link to="/" class="footer__container__right__block__link"
              >Home Page</nuxt-link
            >
            <nuxt-link
              to="/category"
              class="footer__container__right__block__link"
              >Experts By Category</nuxt-link
            >
          </div>
          <div class="footer__container__right__block">
            <p class="footer__container__right__block__name">
              Become an expert
            </p>
            <nuxt-link
              to="/become"
              class="footer__container__right__block__link"
              >How to become an expert</nuxt-link
            >
            <nuxt-link
              to="/become/expert"
              class="footer__container__right__block__link"
              >Fill out the form</nuxt-link
            >
          </div>
          <div class="footer__container__right__block">
            <p class="footer__container__right__block__name">Docs</p>
            <a
              target="_blank"
              href="https://talkearn.gitbook.io/instaservice/"
              class="footer__container__right__block__link"
              >Gitbook</a
            >
            <a
              target="_blank"
              href="https://talkearn.gitbook.io/instaservice/our-ecosystem/about-instaservice"
              class="footer__container__right__block__link"
            >
              About
            </a>
            <a
              target="_blank"
              class="footer__container__right__block__link"
              href="https://talkearn.gitbook.io/instaservice/our-ecosystem/how-it-works"
              >How it works</a
            >
            <a
              target="_blank"
              class="footer__container__right__block__link"
              href="https://talkearn.gitbook.io/instaservice/our-ecosystem/faq"
              >FAQ</a
            >
          </div>
          <div class="footer__container__right__block footer__adress">
            <p class="footer__container__right__block__name">Contacts</p>
            <div class="footer__container__right__block__link__icon">
              <img src="/img/index/footer/map.svg" alt="" />
              <a
                href="mailto:info@talkearn.app"
                class="footer__container__right__block__link"
              >
                info@instaservice.io
              </a>
            </div>
            <div class="footer__container__right__block__link__icon">
              <img src="/img/index/footer/phone.svg" alt="" />
              <a
                href="tel:40746150515"
                class="footer__container__right__block__link"
              >
                + 40 746 150 515
              </a>
            </div>
          </div>
        </div>

        <div class="footer__container__left__icons">
          <a href="https://t.me/talkearn_official">
            <img
              src="/img/index/footer/tg.svg"
              style="fill: #fff"
              class="footer__container__left__icons_fb"
            />
          </a>
          <a href="https://twitter.com/TalkEarn">
            <img
              src="/img/index/footer/tw.svg"
              alt=""
              class="footer__container__left__icons_tw"
            />
          </a>
          <a href="https://talkearn.medium.com">
            <img
              src="/img/index/footer/md.svg"
              alt=""
              class="footer__container__left__icons_yt"
            />
          </a>
          <a href="https://discord.gg/39jtvD6Q">
            <img
              src="/img/index/footer/ds.svg"
              alt=""
              class="footer__container__left__icons_lin"
            />
          </a>
          <a href="https://github.com/talkearn/talkearn">
            <img
              src="/img/index/footer/git.svg"
              alt=""
              class="footer__container__left__icons_inst"
            />
          </a>
        </div>
        <p class="footer__container--text">
          INSTASERVICE connects You with a reliable psychologist instantly
        </p>
      </div>
    </div>
  </v-footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background-color: #1f2131;
  color: $whiteColor;

  &__adress {
    @include rwdmax(1200px) {
      max-width: 230px;
    }
  }

  @include rwdmax(1200px) {
    gap: 40px;
    //justify-content: center;
  }

  &__container {
    margin: auto;
    width: 85%;
    padding: 70px 0;
    display: flex;
    justify-content: space-between;
    gap: 45px;

    &--text {
      text-align: left;

      @include rwdmax(492px) {
        text-align: center;
      }
    }

    @include rwdmax(1200px) {
      //max-width: 100%;
      flex-direction: column;
      margin: auto;
    }

    &__left {
      display: flex;
      width: 100%;
      flex-direction: column;
      gap: 30px;

      @include rwdmax(1200px) {
        //width: 100%;
        gap: 40px;
        text-align: center;
      }

      @include rwdmax(492px) {
        //max-width: 100%;
        align-items: center;
      }

      & p {
        font-size: $fs;
        line-height: 1.3;
      }

      &__icons {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      &__icons img {
        height: 20px;
      }

      &__icons a {
        padding: 20px;
      }

      &__icons a:hover {
        border-radius: 50px;
        background-color: $purpleColor;
      }
    }

    &__right {
      display: flex;
      justify-content: space-between;
      gap: 100px;

      @include rwdmax(1419px) {
        gap: 70px;
      }

      @include rwdmax(1200px) {
        flex-wrap: wrap;
        //justify-content: center;
      }

      @include rwdmax(1100px) {
        gap: 70px;
      }

      @include rwdmax(872px) {
        display: grid;
        justify-content: stretch;
        grid-template-columns: repeat(2, 1fr);
      }

      @include rwdmax(492px) {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
      }

      &__block {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        justify-content: flex-start;
        gap: 20px;

        @include rwdmax(1200px) {
          align-items: flex-start;
        }

        @include rwdmax(742px) {
          align-items: flex-start;
          flex-basis: 100%;
          flex: 2;
        }

        @include rwdmax(492px) {
          align-items: center;
        }

        &__name {
          font-size: 20px;
          font-weight: 600;
        }

        &__link {
          font-size: 13px;
          font-weight: 400;
          color: $whiteColor;
          line-height: 1.3;

          &__icon {
            display: flex;
            align-items: center;
            gap: 7px;
          }
        }
      }
    }
  }
}

.footer__adress {
  display: flex;
}
</style>
