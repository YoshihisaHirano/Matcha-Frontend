import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 5000,
    position: "bottom-right",
    hideProgressBar: true,
    limit: 3,
  });
});
