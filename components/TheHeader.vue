<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";

const data = computed(() => useUserStore().userHeaderInfo);
</script>

<template>
  <header>
    <div class="menu-container">
      <MiniNav />
      <ThemeToggle />
    </div>
    <div class="user-profile-container">
      <UserSettings />
      <NotificationIcon :new-notification="true" />
      <ProfilePictureSmall
        :image="data?.mainImage"
        :username="`${data?.firstName || ''} ${data?.lastName || ''}`"
      />
      <Button @click="useLogout" class-name="logout-btn" title="Log out" variant="transparent">
        <span class="typcn-upload"></span>
      </Button>
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

.logout-btn {
  transform: rotate(90deg);
  font-size: 1.6rem;
  line-height: 1;
}

.menu-container {
  display: flex;
  align-items: center;
  gap: .5rem;
}
</style>
