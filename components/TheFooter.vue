<template>
  <v-footer class="footer">
    <div class="footer__container">
      <div class="footer__container__left">

        <div class="footer__container__right">
          <img src="@/static/img/white-logo.png" style="height: 60px" alt=""/>

          <div class="footer__container__right__block">
            <p class="footer__container__right__block__name">{{ $t('experts') }}</p>
            <nuxt-link :to="`/${$i18n.locale}`" class="footer__container__right__block__link">
              {{ $t('homePage') }}
            </nuxt-link>
            <nuxt-link
              :to="`/${$i18n.locale}/category`"
              class="footer__container__right__block__link">
              {{ $t('expertsByCategory') }}
            </nuxt-link>
            <a
              target="_blank"
              href="https://talkearn.gitbook.io/instaservice/"
              class="footer__container__right__block__link">
              {{ $t('docs') }}
            </a>
          </div>
<!--          <div class="footer__container__right__block">-->
<!--            <p class="footer__container__right__block__name">{{ $t('docs') }}</p>-->
<!--            <a-->
<!--              target="_blank"-->
<!--              href="https://talkearn.gitbook.io/instaservice/"-->
<!--              class="footer__container__right__block__link">-->
<!--              {{ $t('gitbook') }}-->
<!--            </a>-->
<!--            <a-->
<!--              target="_blank"-->
<!--              href="https://talkearn.gitbook.io/instaservice/our-ecosystem/about-instaservice"-->
<!--              class="footer__container__right__block__link">-->
<!--              {{ $t('about') }}-->
<!--            </a>-->
<!--            <a-->
<!--              target="_blank"-->
<!--              class="footer__container__right__block__link"-->
<!--              href="https://talkearn.gitbook.io/instaservice/our-ecosystem/how-it-works">-->
<!--              {{ $t('howItWork') }}-->
<!--            </a>-->
<!--            <a-->
<!--              target="_blank"-->
<!--              class="footer__container__right__block__link"-->
<!--              href="https://talkearn.gitbook.io/instaservice/our-ecosystem/faq">-->
<!--              {{ $t('faq') }}-->
<!--            </a>-->
<!--          </div>-->
          <div class="footer__container__right__block footer__adress">
            <p class="footer__container__right__block__name">{{ $t('contacts') }}</p>
            <div class="footer__container__right__block__link__icon">
              <img src="/img/index/footer/map.svg" alt=""/>
              <a
                href="mailto:info@instantexpert.online"
                class="footer__container__right__block__link"
              >
                info@instantexpert.online
              </a>
            </div>
            <div class="footer__container__right__block__link__icon">
              <img src="/img/index/footer/phone.svg" alt=""/>
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
          {{ $t('footerText') }}
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
