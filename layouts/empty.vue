<script setup lang="ts">
import { useActiveUser } from "~/composables/useActiveUser";
import { useUserStore } from "~/stores/userStore";

// await useActiveUser();
// if (useUserStore().userId) {
//   await navigateTo("/", { redirectCode: 301 });
// }

</script>

<template>
  <div>this is empty layout</div>
  <slot />
</template>

<style>
#__nuxt {
  /* display: block; */
  /* height: fit-content; */
}
</style>
