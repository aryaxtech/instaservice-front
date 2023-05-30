<template>
  <nav style="display: flex" class="navigation">
    <svg
      class="bar"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      @click="closeMenu"
    >
      <!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->
      <path
        d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
      />
    </svg>
    <div
      v-if="width < 1121 && isOpenMenu"
      class="mobile-container"
      ref="mobile"
    >
      <div class="topnav">
        <div id="myLinks">
          <ul>
            <li class="mobile__item">
              {{ $t('experts') }}
              <ul>
                <li class="mobile__subitem">
                  <nuxt-link :to="`/${$i18n.locale}`">{{ $t('homePage') }}</nuxt-link>
                </li>
                <li class="mobile__subitem">
                  <nuxt-link :to="`/${$i18n.locale}/category`">{{ $t('expertsByCategory') }}</nuxt-link>
                </li>
              </ul>
            </li>
            <!--            <li class="mobile__item">-->
            <!--              Become an expert-->
            <!--              <ul>-->
            <!--                <li class="mobile__subitem">-->
            <!--                  <nuxt-link :to="`/${$i18n.locale}/become`">How to become an expert</nuxt-link>-->
            <!--                </li>-->
            <!--                <li class="mobile__subitem">-->
            <!--                  <nuxt-link :to="`/${$i18n.locale}/become/expert`">Fill out the form</nuxt-link>-->
            <!--                </li>-->
            <!--              </ul>-->
            <!--            </li>-->
            <li class="mobile__item">
              {{ $t('docs') }}
              <ul>
                <li class="mobile__subitem">
                  <a
                    target="_blank"
                    href="https://talkearn.gitbook.io/instaservice/">
                    {{ $t('gitbook') }}
                  </a>
                </li>
                <li class="mobile__subitem">
                  <a
                    target="_blank"
                    href="https://talkearn.gitbook.io/instaservice/our-ecosystem/about-instaservice">
                    {{ $t('about') }}
                  </a>
                </li>
                <li class="mobile__subitem">
                  <a
                    target="_blank"
                    href="https://talkearn.gitbook.io/instaservice/our-ecosystem/how-it-works">
                    {{ $t('howItWork') }}
                  </a>
                </li>
                <li class="mobile__subitem">
                  <a
                    target="_blank"
                    href="https://talkearn.gitbook.io/instaservice/our-ecosystem/faq">
                    {{ $t('faq') }}
                  </a>
                </li>
                <li class="mobile__subitem">
                  <a
                    target="_blank"
                    href="https://www.canva.com/design/DAFTCFsSz6s/3HdX7szhwt0aILtTU0C6yQ/view?utm_content=DAFTCFsSz6s&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelin">
                    {{ $t('pitchDeck') }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="mobile__item-bottom">
            <li class="mobile__subitem-bottom">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                xml:space="preserve"
                width="30px"
                fill="gray"
              >
                <path
                  fill="#282828"
                  d="M138.832 137.698h-77c-5.2 0-9.5-4.3-9.5-9.5v-57c0-5.2 4.3-9.5 9.5-9.5h77c5.2 0 9.5 4.3 9.5 9.5v57c0 5.2-4.3 9.5-9.5 9.5zm-77-72c-3 0-5.5 2.5-5.5 5.5v57c0 3 2.5 5.5 5.5 5.5h77c3 0 5.5-2.5 5.5-5.5v-57c0-3-2.5-5.5-5.5-5.5h-77z"
                />
                <path
                  fill="#282828"
                  d="M100.332 112.098c-.5 0-1-.2-1.4-.6l-31.6-31.6c-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0l30.2 30.1 30.8-30.8c.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8l-32.2 32.3c-.4.4-.9.6-1.4.6z"
                />
                <path
                  fill="#282828"
                  d="M69.032 122.198c-.5 0-1-.2-1.4-.6-.8-.8-.8-2 0-2.8l20.7-20.7c.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8l-20.6 20.7c-.4.4-1 .6-1.5.6zM132.632 122.198c-.5 0-1-.2-1.4-.6l-20.7-20.7c-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0l20.7 20.7c.8.8.8 2 0 2.8-.4.4-.9.6-1.4.6z"
                />
              </svg>
              <a href="mailto:info@talkearn.app" style="color: gray"
              >info@instaservice.io</a
              >
            </li>
            <li class="mobile__subitem-bottom">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 120"
                style="enable-background: new 0 0 120 120"
                xml:space="preserve"
                width="20"
                fill="gray"
              >
                <switch>
                  <g>
                    <path
                      d="M30.9 120c-6.4 0-12.9-2.4-17.7-7.3l-1.8-1.7 99.5-99.5 1.7 1.7c9.8 9.8 9.8 25.7 0 35.5l-64 64c-4.8 4.9-11.3 7.3-17.7 7.3zm-12.4-9.2c7.9 6.2 19.4 5.6 26.7-1.6l64-64c7.3-7.3 7.8-18.8 1.6-26.7l-92.3 92.3z"
                    />
                    <path
                      d="M84.2 45.1 69.3 30.2 99.5 0l14.9 14.9-30.2 30.2zm-7.9-14.9 7.9 7.9 23.2-23.2L99.5 7 76.3 30.2zM14.9 114.4 0 99.5l30.2-30.2 14.9 14.9-30.2 30.2zM7 99.5l7.9 7.9 23.2-23.2-7.9-7.9L7 99.5z"
                    />
                  </g>
                </switch>
              </svg>
              <a href="tel:40746150515" style="color: gray">+ 40 746 150 515</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <ul v-else-if="width > 1121" class="navigation__list">
      <li class="navigation__item">
        <v-menu open-on-hover close-on-click rounded="b-xl" offset-y>
          <template #activator="{ on, attrs }">
            <div stlye="z-index: 10" v-bind="attrs" v-on="on"> {{ $t('experts') }}</div>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <nuxt-link :to="`/${$i18n.locale}`">{{ $t('homePage') }}</nuxt-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <nuxt-link :to="`/${$i18n.locale}/category`">{{ $t('expertsByCategory') }}</nuxt-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </li>
      <li class="navigation__item">
        <a
          target="_blank" class="black-link"
          href="https://talkearn.gitbook.io/instaservice/">
          Docs
        </a>
      </li>
      <!--      <li class="navigation__item">-->
      <!--        <v-menu open-on-hover close-on-click rounded="b-xl" offset-y>-->
      <!--          <template #activator="{ on, attrs }">-->
      <!--            <div stlye="z-index: 10" v-bind="attrs" v-on="on">-->
      <!--              Become an expert-->
      <!--            </div>-->
      <!--          </template>-->
      <!--          <v-list>-->
      <!--            <v-list-item>-->
      <!--              <v-list-item-title>-->
      <!--                <nuxt-link to="/become">How to become an expert</nuxt-link>-->
      <!--              </v-list-item-title>-->
      <!--            </v-list-item>-->
      <!--            <v-list-item>-->
      <!--              <v-list-item-title>-->
      <!--                <nuxt-link to="/become/expert">Fill out the form</nuxt-link>-->
      <!--              </v-list-item-title>-->
      <!--            </v-list-item>-->
      <!--          </v-list>-->
      <!--        </v-menu>-->
      <!--      </li>-->
      <!--      <li class="navigation__item">-->
      <!--        <v-menu open-on-hover close-on-click rounded="b-xl" offset-y>-->
      <!--          <template #activator="{ on, attrs }">-->
      <!--            <div stlye="z-index: 10" v-bind="attrs" v-on="on">Docs</div>-->
      <!--          </template>-->
      <!--          <v-list>-->
      <!--            <v-list-item>-->
      <!--              <v-list-item-title>-->
      <!--                <a-->
      <!--                  target="_blank"-->
      <!--                  href="https://talkearn.gitbook.io/instaservice/">-->
      <!--                  {{ $t('gitbook') }}-->
      <!--                </a>-->
      <!--              </v-list-item-title>-->
      <!--            </v-list-item>-->
      <!--            <v-list-item>-->
      <!--              <v-list-item-title>-->
      <!--                <a-->
      <!--                  target="_blank"-->
      <!--                  href="https://talkearn.gitbook.io/instaservice/our-ecosystem/about-instaservice">-->
      <!--                  {{ $t('about') }}-->
      <!--                </a>-->
      <!--              </v-list-item-title>-->
      <!--            </v-list-item>-->
      <!--            <v-list-item>-->
      <!--              <v-list-item-title>-->
      <!--                <a-->
      <!--                  target="_blank"-->
      <!--                  href="https://talkearn.gitbook.io/instaservice/our-ecosystem/how-it-works">-->
      <!--                  {{ $t('howItWorks') }}-->
      <!--                </a>-->
      <!--              </v-list-item-title>-->
      <!--            </v-list-item>-->
      <!--            <v-list-item>-->
      <!--              <v-list-item-title>-->
      <!--                <a-->
      <!--                  target="_blank"-->
      <!--                  href="https://talkearn.gitbook.io/instaservice/our-ecosystem/faq">-->
      <!--                  {{ $t('faq') }}-->
      <!--                </a>-->
      <!--              </v-list-item-title>-->
      <!--            </v-list-item>-->
      <!--            <v-list-item>-->
      <!--              <v-list-item-title>-->
      <!--                <a-->
      <!--                  target="_blank"-->
      <!--                  href="https://www.canva.com/design/DAFTCFsSz6s/3HdX7szhwt0aILtTU0C6yQ/view?utm_content=DAFTCFsSz6s&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink">-->
      <!--                  {{ $t('pitchDeck') }}-->
      <!--                </a>-->
      <!--              </v-list-item-title>-->
      <!--            </v-list-item>-->
      <!--          </v-list>-->
      <!--        </v-menu>-->
      <!--      </li>-->

      <li class="navigation__item">
        <v-menu open-on-hover close-on-click rounded="b-xl" offset-y>
          <template #activator="{ on, attrs }">
            <div stlye="z-index: 10" v-bind="attrs" v-on="on">{{ $t('contacts') }}</div>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <a
                  href="mailto:info@instantexpert.online">
                  info@instantexpert.online
                </a>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <a
                  href="tel:+40746150515"
                >40746150515</a
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </li>
      <li class="navigation__item" v-if="authUser">
        <v-menu open-on-hover close-on-click rounded="b-xl" offset-y>
          <template #activator="{ on, attrs }">
            <div stlye="z-index: 10" v-bind="attrs" v-on="on">Welcome, {{ authUser.name }}</div>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <a @click="logout">
                  Logout
                </a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </li>
    </ul>
    <nuxt-link class="navigation__item--purple"
               :to="`/${$i18n.locale}/auth/login`"
               v-if="!authUser">
      LOG IN
    </nuxt-link>
    <!--    <nuxt-link class="navigation__item&#45;&#45;purple"-->
    <!--               :to="`#`"-->
    <!--               v-else>-->
    <!--      Welcome, {{ authUser.name }}-->
    <!--    </nuxt-link>-->

  </nav>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  data: () => ({
    width: null,
    isOpenMenu: false,
    // TODO: make navigation as array
    // navigation: [
    //   {
    //     name: 'Home',
    //     href: '/'
    //     child: [

    //     ]
    //   }
    // ]
  }),
  watch: {
    '$route.path': {
      handler() {
        this.isOpenMenu = false;
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      authUser: 'auth/getUser',
      defaultLanguage: 'language/getDefaultLanguage',
    })
  },
  methods: {
    ...mapActions({
      onLogout: 'auth/onLogout',
    }),
    async logout() {
      await this.onLogout();
      await this.$router.push(`/${this.defaultLanguage}`);
    },
    updateWidth() {
      this.width = window.innerWidth;
      if (this.width > 1121) {
        this.isOpenMenu = false;
      }
    },
    closeMenu() {
      this.isOpenMenu = !this.isOpenMenu;
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateWidth);
    this.updateWidth();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateWidth);
  },
};
</script>

<style lang="scss" scoped>
.v-menu__content {
  box-shadow: none !important;
}

.navigation {
  // .navigation__list
  display: flex;
  align-items: center;

  &__list {
    list-style-type: none;
    font-size: $fs;
    font-weight: 400;
  }

  // .navigation__item

  &__item {
    display: inline-block;
    margin-right: 50px;
    padding-top: 10px !important;

    [aria-expanded='true'] {
      padding: 10px;
      border-top-left-radius: 24px;
      border-top-right-radius: 24px;
      background-color: white;
    }

    [aria-expanded='false'] {
      padding: 10px;
    }

    @include rwdmax(1653px) {
      margin-right: 15px;
    }
  }

  // .navigation__item--purple

  &__item--purple {
    color: $whiteColor !important;
    font-size: $fs;
    font-weight: 600;
    background-color: $purpleColor;
    padding: 16px;
    border-radius: 37px;

    @include rwdmax(575px) {
      display: none;
    }
  }

  /* Burger */
  body {
    font-family: Arial, Helvetica, sans-serif;
  }

  .mobile-container {
    width: 100%;
    position: absolute;
    z-index: 10;
    top: 110px;
    left: 0px;
    margin: auto;
    background-color: #fff;
    height: 500px;
    color: white;
    height: 100vh;
    border-radius: 10px;

    @include rwdmax(881px) {
      top: 75px;
    }

    @include rwdmax(575px) {
      top: 70px;
    }
  }

  .mobile__item {
    color: black;
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;

    &-bottom {
      margin-top: 40px;
    }
  }

  .mobile__subitem {
    font-weight: normal;
    margin-top: 10px;
    font-size: 17px;
  }

  .mobile__subitem-bottom {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
  }

  .topnav {
    overflow: hidden;
    background-color: #fff;
    position: relative;
  }

  .topnav #myLinks {
    display: flex;
    flex-direction: column;
  }

  .topnav a.icon {
    background: black;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
  }

  .topnav a:hover {
    background-color: #fff;
    color: black;
  }

  .bar {
    @include rwdmin(1120px) {
      display: none;
    }

    @include rwdmax(881px) {
      position: absolute;
      display: flex;
      margin-left: 20px;
      left: 0px;
    }

    @include rwdmax(345px) {
      position: absolute;
      display: flex;
      margin-left: 20px;
      left: 0px;
    }

    margin-right: 20px;
    margin-left: 20px;
    width: 20px;
  }
}

.v-list-item__title a {
  color: #1f2131;
}

.black-link {
  color: black;
}
</style>
