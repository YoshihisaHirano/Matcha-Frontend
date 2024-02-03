<script setup lang="ts">
import { useActiveUser } from "~/composables/useActiveUser";
import { useNotificationSocket } from "~/composables/useNotificationSocket";
import { useUserStore } from "~/stores/userStore";

useSeoMeta({
  title: "Welcome | Matcha",
});

useActiveUser();

const userStore = computed(() => useUserStore());

onMounted(() => {
  useNotifications();
  if (userStore.value.userId && userStore.value.emailVerified) {
    useUserLocation();
  }
  if (userStore.value.isFullUser) {
    useNotificationSocket();
  }
});
</script>

<template>
  <template v-if="userStore?.userId">
    <SidebarNav />
    <TheHeader />
    <main>
      <slot v-if="userStore?.emailVerified && userStore.isFullUser && userStore.user?.mainImage" />
      <FullInfoForm v-else-if="userStore?.emailVerified" />
      <VerifyEmail v-else :userId="userStore?.userId" />
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
