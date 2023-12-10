<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';

definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "My Profile | Matcha",
});

const user = computed(() => ({ user: useUserStore().userCommonData}))
</script>

<template>
    <UserProfile v-if="user.user?.mainImage" v-bind="user"/>
</template>