<script setup lang="ts">
import { useInteractionsStore } from "~/stores/interactionsStore";
import { useUserStore } from "~/stores/userStore";

useSeoMeta({
  title: "Users | Matcha",
});

const route = useRoute();
const id = computed(() => route.params.id as string);

if (useUserStore().isUserCurrent(id.value)) {
  await navigateTo("/", { redirectCode: 301 });
}

const data = await useOtherUsers(id.value);
await useInteractionsStore().viewUser(id.value);
</script>

<template>
  <UserProfile v-if="data" :user="data" />
  <NoData v-else />
</template>
