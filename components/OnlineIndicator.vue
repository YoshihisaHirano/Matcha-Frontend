<script setup lang="ts">
interface OnlineIndicatorProps {
  isOnline: boolean;
  showLastSeen?: boolean;
  lastSeen?: number;
  className?: string;
}

defineProps<OnlineIndicatorProps>();
</script>

<template>
  <span
    v-if="!showLastSeen || isOnline"
    :class="['online-indicator', { online: isOnline }, className]"
    :title="`The user is ${isOnline ? 'online' : 'offline'}`"
  ></span>
  <span :class="['last-seen', className]" v-if="showLastSeen && lastSeen && !isOnline">
    last seen {{ getStringDate(lastSeen) }}
  </span>
</template>

<style scoped>
.online-indicator::before {
  content: "";
  height: 0.85rem;
  width: 0.85rem;
  border-radius: 50%;
  background: var(--offline-orange);
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.15rem;
  padding-bottom: 0.1rem;
}

.online.online-indicator::before {
  background: var(--online-green);
}

.last-seen {
  display: inline-block;
  font-size: 0.9rem;
  opacity: 0.7;
  min-height: 1.2rem;
  font-weight: 600;
  margin-left: 0.25rem;
}
</style>
