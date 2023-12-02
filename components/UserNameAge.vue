<script setup lang="ts">
interface UserNameAgeProps {
  firstName: string;
  lastName?: string;
  dateOfBirth?: number;
  online?: boolean;
  className?: string;
}

const props = defineProps<UserNameAgeProps>();
const age = computed(() =>
  props.dateOfBirth ? getAge(props.dateOfBirth) : -1
);
</script>

<template>
  <p :class="`main-user-info ${className || ''}`">
    {{ firstName }}<span v-if="lastName">&nbsp;{{ lastName }}</span>
    <span v-if="age > -1">, {{ age }}</span>
    <OnlineIndicator v-if="online !== undefined" :is-online="online" />
  </p>
</template>

<style scoped>
.main-user-info {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.65rem;
  margin-right: .2rem;
}

@media screen and (min-width: 768px) {
  .main-user-info {
    font-size: 1.75rem;
  }
}
</style>
