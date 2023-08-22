<script setup lang="ts">
interface UserNameAgeProps {
  firstName: string;
  lastName?: string;
  dateOfBirth: number;
  online?: boolean;
  className?: string;
}

const props = defineProps<UserNameAgeProps>();
const age = computed(() => getAge(props.dateOfBirth));
</script>

<template>
<p :class="`main-user-info ${className || ''}`">
    {{ firstName }}<span v-if="lastName">&nbsp;{{ lastName }}</span
    >, {{ age }}
    <span
      v-if="online !== undefined"
      :class="['online-indicator', { online }]"
      :title="`The user is ${online ? 'online' : 'offline'}`"
    ></span>
</p>
</template>

<style scoped>
.main-user-info {
  font-size: 1.75rem;
  font-weight: 500;
  margin-bottom: 0.65rem;
}

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
</style>

