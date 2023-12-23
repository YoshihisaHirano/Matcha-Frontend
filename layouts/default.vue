<script setup lang="ts">
import { useActiveUser } from "~/composables/useActiveUser";
import { useUserStore } from "~/stores/userStore";

useActiveUser();
useUserLocation();
const userStore = computed(() => useUserStore().user);
</script>

<template>
  <template v-if="userStore?.id">
    <SidebarNav />
    <TheHeader />
    <main>
      <slot v-if="userStore?.emailVerified && userStore.mainImage" />
      <FullInfoForm v-else-if="userStore?.emailVerified" />
      <VerifyEmail v-else :userId="userStore?.id" />
    </main>
  </template>
</template>

<style scoped>
main {
  grid-column: 2/3;
  grid-row: 2/3;
  padding: 0.5rem 0.85rem;
}
</style>

<style>
#__nuxt {
  height: 100vh;
}

@media screen and (min-width: 768px) {
  #__nuxt {
    display: grid;
    grid-template-rows: minmax(50px, 10%) auto;
    grid-template-columns: minmax(80px, 5vw) auto;
  }
}

@media screen and (min-width: 1024px) {
  #__nuxt {
    grid-template-columns: minmax(200px, 20vw) auto;
  }
}
</style>
