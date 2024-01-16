<script setup lang="ts">
import type { Notification } from "~/types/global";

interface NotificationContentProps {
  notification: Notification;
}

defineProps<NotificationContentProps>();
</script>

<template>
  <div class="notificaton-container">
    <SmallUserPicture :image="notification.user.mainImage" />
    <p>
      <CustomLink
        class-name="notification-link"
        :href="`/profile/${notification.user.id}`"
      >
        {{ notification.user.firstName }}
        {{ notification.user.lastName }}</CustomLink
      >
      {{ notificationMessageMap[notification.type] }}
    </p>
  </div>
</template>

<style scoped>
.notificaton-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.notification-link {
  display: inline;
  color: var(--accent-red);
  font-weight: 600;
}
</style>
