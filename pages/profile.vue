<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';
import { useInteractionsStore } from '~/stores/interactionsStore';

useSeoMeta({
  title: "My Profile | Matcha",
});

const user = computed(() => ({ user: useUserStore().userCommonData}))
</script>

<template>
    <UserProfile v-bind="user"/>
</template>