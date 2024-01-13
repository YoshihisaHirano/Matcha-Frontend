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
      baseSocket: process.env.BASE_SOCKET,
      searchBinID: process.env.SEARCH_BIN_ID, // TODO: delete when the backend is ready
      meBinID: process.env.ME_BIN_ID, // TODO: delete when the backend is ready
      xMasterKey: process.env['X-MASTER-KEY'],
      xAccessKey: process.env['X-ACCESS-KEY'],
      rapidApiKey: process.env['X-RapidAPI-Key'],
      geocodingHost: process.env.X_RAPID_GEOCODING_HOST,
      mapTileHost: process.env.X_RAPID_MAPTILE_HOST,
      binBaseBackend: process.env.BIN_BASE_BACKEND, // TODO: delete when the backend is ready
      tagBinID: process.env.TAG_BIN_ID, // TODO: delete when the backend is ready
      profileBinID: process.env.PROFILE_BIN_ID, // TODO: delete when the backend is ready
      listBinID: process.env.LIST_BIN_ID, // TODO: delete when the backend is ready
      messageBinID: process.env.MESSAGE_BIN_ID, // TODO: delete when the backend is ready
      chatBinID: process.env.CHAT_BIN_ID, // TODO: delete when the backend is ready
    },
  },
  pages: true,
  routeRules: {
    '/': { prerender: true }
  }
});
