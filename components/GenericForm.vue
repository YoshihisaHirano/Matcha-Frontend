<script setup lang="ts">

interface GenericFormProps {
  className?: string
  fieldsetClassName?: string
}

defineProps<GenericFormProps>()

const emits = defineEmits(["submit"]);

function submitForm(event: Event) {
  event.preventDefault();
  emits('submit');
}
</script>

<template>
  <form @submit="submitForm" :class="`${className || ''}`">
    <fieldset :class="`form-fieldset ${fieldsetClassName || ''}`">
        <slot/>
    </fieldset>
  </form>
</template>

<style scoped>
.form-fieldset {
  display: flex;
  gap: .5rem;
  flex-direction: column;
  border: none;
  padding: 0;
  overflow-y: auto;
}

:global(.form-fieldset span[class*="typcn-"]::before) {
  margin-right: 0.35rem;
  color: var(--typcn-accent);
}

:global(.form-fieldset .form-label:last-of-type) {
  margin-bottom: .5rem;
}
</style>
