import colors from 'vuetify/es5/util/colors';
import ro from './locales/ro';
import ru from './locales/ru';

export default {
  mode: 'universal',
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 3021,
  },
  head: {
    titleTemplate: '%s',
    title: 'INSTANTEXPERT.ONLINE',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'},
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.svg'}],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/font.scss', '~/assets/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/socket', ssr: false },
    { src: '@plugins/v-calendar.js', ssr: false },
    { src: '@plugins/countdown.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', '~/components/sections'],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-socket-io',
    '@nuxtjs/i18n',
  ],

  // moment: {
  //   locales: ['ru', 'en'],
  // },

  i18n: {
    strategy: 'prefix',
    locales: ['ro', 'ru'],
    defaultLocale: 'ro',
    vueI18n: {
      fallbackLocale: 'ro',
      messages: {
        ro: {...ro},
        ru: {...ru},
      }
    }
  },

  io: {
    // module options
    sockets: [{
      name: 'main',
      // url: 'https://core.instantexpert.online',
      url: 'http://127.0.0.1:5000',
    }]
  },

  loading: {
    color: 'blue',
    height: '5px',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
};
