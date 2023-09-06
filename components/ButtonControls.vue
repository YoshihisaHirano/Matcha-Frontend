<script setup lang="ts">
interface ButtonControlsProps {
    disabled?: boolean
}

defineProps<ButtonControlsProps>()

const emits = defineEmits(['submit', 'reset'])

function onSubmit() {
    emits('submit')
}

function onReset() {
    emits('reset')
}
</script>

<template>
    <div class="bottom-controls">
      <Button :disabled="disabled" @click="onReset" variant="secondary">Reset</Button>
      <Button :disabled="disabled" @click="onSubmit" variant="primary">Submit</Button>
    </div>
</template>

<style scoped>
.bottom-controls {
  display: flex;
  margin-left: auto;
  margin-top: 1rem;
  width: fit-content;
  gap: 0.75rem;
}
</style>