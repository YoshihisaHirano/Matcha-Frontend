<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import { UserCardInfo } from "~/types/global";

interface UserCardProps {
  user: UserCardInfo;
}

const props = defineProps<UserCardProps>();
const userLocation = useUserStore().userLocation || undefined;
const userlink = computed(() => `/users/${props.user.id}`);
</script>

<template>
  <figure>
    <img :src="user.image" alt="User profile picture" class="profile-pic" />
  </figure>
  <div class="search-card-info">
    <UserLocation
      :location="user.location"
      :current-user-location="userLocation"
    />
    <UserNameAge
      :first-name="user.firstName"
      :date-of-birth="user.dateOfBirth"
    />
    <TagList :tags="user.tags" />
    <UserGender :gender="user.gender" :sex-pref="user.sexPref" />
  </div>
</template>

<style scoped>
.search-card-info {
  position: relative;
  z-index: 3;
  padding: 0.5rem 0.85rem;
}

.search-card-info .tags-container {
  margin-bottom: 0.75rem;
  padding: 0;
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
  box-shadow: 0px -180px 153px 12px rgba(104, 23, 23, 0.85) inset;
}

a {
  text-decoration: none;
  display: block;
}
</style>
