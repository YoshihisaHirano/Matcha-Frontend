<script lang="ts" setup>
interface ButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset'
}

defineProps<ButtonProps>();
const emits = defineEmits(["click"]);

function handleClick() {
  emits("click");
}
</script>

<template>
  <button :type="type" @click="handleClick" :class="className">
    <slot/>
  </button>
</template>

<style scoped>
button {
  appearance: none;
  display: block;
  cursor: pointer;
  border: none;
}
</style>
