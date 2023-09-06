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
  gap: 1.5rem;
  flex-direction: column;
  padding: 3rem 4rem;
  border: 10px solid;
  border-image-slice: 1;
  border-width: 11px;
  border-image-source: linear-gradient(to left, #fdbb2d, #b21f1f, #1a2a6c);
  box-shadow: 0 0.5rem 0.3rem rgba(0, 0, 0, 0.15);
}

:global(.form-fieldset span[class*="typcn-"]::before) {
  margin-right: 0.35rem;
  color: var(--typcn-accent);
}

:global(.form-fieldset .form-label:last-of-type) {
  margin-bottom: 2.5rem;
}
</style>
