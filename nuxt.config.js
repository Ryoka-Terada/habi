import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - front',
    title: 'front',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/globals.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/toggle.js',
    '@plugins/i18n.ts',
    '@plugins/vee-validate.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  components: [
    {
      path: '@components/',
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Zen Maru Gothic': [300, 400, 700],
        },
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n',
  ],

  i18n: {
    locales: [{ code: 'ja', iso: 'ja_JP', file: 'ja.json' }],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'ja',
    vueI18n: {
      fallbackLocale: 'ja',
    },
    detectBrowserLanguage: { alwaysRedirect: true },
    vuex: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: '/',
    proxy: true,
  },

  proxy: {
    '/api/': 'http://localhost:8080',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          // primary: '#d9b44a',
          primary: '#2c4a52',
          accent: '#537072',
          secondary: '#8e9b97',
          info: '#F4EBDB',
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          pay: '#ed8c72',
          income: '#75b1a9',
        },
        dark: {},
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
