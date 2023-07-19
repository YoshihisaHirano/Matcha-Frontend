// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "~/assets/style/theme.css",
    "~/assets/style/typography.css",
    "~/assets/style/global.css",
  ],
  modules: [
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  runtimeConfig: {
    public: {
      baseBackend: process.env.BASE_BACKEND,
      searchBinID: process.env.SEARCH_BIN_ID,
      xMasterKey: process.env['X-MASTER-KEY'],
      xAccessKey: process.env['X-ACCESS-KEY'],
      rapidApiKey: process.env['X-RapidAPI-Key'],
      geocodingHost: process.env.X_RAPID_GEOCODING_HOST,
      mapTileHost: process.env.X_RAPID_MAPTILE_HOST
    },
  },
  pages: true,
  routeRules: {
    '/': { prerender: true }
  }
});
