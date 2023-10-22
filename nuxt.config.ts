// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "~/assets/style/typicons.css",
    "~/assets/style/animations.css",
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
      meBinID: process.env.ME_BIN_ID,
      xMasterKey: process.env['X-MASTER-KEY'],
      xAccessKey: process.env['X-ACCESS-KEY'],
      rapidApiKey: process.env['X-RapidAPI-Key'],
      geocodingHost: process.env.X_RAPID_GEOCODING_HOST,
      mapTileHost: process.env.X_RAPID_MAPTILE_HOST,
      tagBinID: process.env.TAG_BIN_ID,
      profileBinID: process.env.PROFILE_BIN_ID,
      listBinID: process.env.LIST_BIN_ID,
      messageBinID: process.env.MESSAGE_BIN_ID,
      chatBinID: process.env.CHAT_BIN_ID,
    },
  },
  pages: true,
  routeRules: {
    '/': { prerender: true }
  }
});
