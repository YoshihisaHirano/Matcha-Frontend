<script setup lang="ts">
import { useUserStore } from '~/stores/userStore';

useSeoMeta({
  title: "My Profile | Matcha",
});

const user = useUserStore().user
</script>

<template>
    <UserProfile/>
    <!-- <pre>{{ user }}</pre> -->
</template>