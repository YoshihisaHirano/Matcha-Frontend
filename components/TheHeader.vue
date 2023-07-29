<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";

const data = useUserStore().userHeaderInfo;
</script>

<template>
  <header>
    <ThemeToggle />
    <div class="user-profile-container">
      <NotificationIcon :new-notification="true" />
      <ProfilePictureSmall
        :image="data?.mainImage"
        :username="`${data?.firstName || ''} ${data?.lastName || ''}`"
      />
      <UserSettings />
    </div>
  </header>
</template>

<style scoped>
header {
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  justify-content: space-between;
  align-self: center;
  padding: 0.5rem 0.85rem;
}

.user-profile-container {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  position: relative;
}
</style>
