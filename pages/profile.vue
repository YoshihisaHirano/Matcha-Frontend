<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';

useSeoMeta({
  title: "My Profile | Matcha",
});

const user = computed(() => ({ user: useUserStore().userCommonData}))
console.log(user)
</script>

<template>
    <UserProfile v-bind="user"/>
    <!-- <pre>{{ user }}</pre> -->
</template>