// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "~/assets/style/theme.css",
    "~/assets/style/typography.css",
    "~/assets/style/global.css",
  ],
  runtimeConfig: {
    public: {
      baseBackend: process.env.BASE_BACKEND,
      searchBinID: process.env.SEARCH_BIN_ID,
      xMasterKey: process.env['X-MASTER-KEY'],
      xAccessKey: process.env['X-ACCESS-KEY'],
    },
  },
  pages: true,
});
