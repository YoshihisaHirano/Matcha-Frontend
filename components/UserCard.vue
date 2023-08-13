<script setup lang="ts">
import { UserCardInfo } from "~/types/global";

interface UserCardProps {
  user: UserCardInfo;
}

const props = defineProps<UserCardProps>();

const propsNoImg = computed<Omit<UserCardInfo, "image"> & { image?: string }>(
  () => ({ ...props.user })
);
delete propsNoImg.value.image;
</script>

<template>
  <figure>
    <img :src="user.image" alt="User profile picture" class="profile-pic" />
  </figure>
  <MainUserData v-bind="propsNoImg" class-name="search-card-info" />
</template>

<style scoped>
.search-card-info {
  position: relative;
  z-index: 3;
  padding: 0.5rem 0.85rem;
}

.search-card-info p.location span::before,
.search-card-info {
  color: var(--text-white);
}

.profile-pic {
  position: relative;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: none;
}

figure {
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
  pointer-events: none;
  box-shadow: 0px -145px 153px 12px rgba(104, 23, 23, 0.85) inset;
}
</style>
