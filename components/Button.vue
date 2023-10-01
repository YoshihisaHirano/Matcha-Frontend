<script lang="ts" setup>
interface ButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "transparent" | "round" | "primary" | "secondary" | "fancy";
  title?: string;
}

defineProps<ButtonProps>();
const emits = defineEmits(["click"]);

function handleClick(event: Event) {
  emits("click", event);
}
</script>

<template>
  <button
    :data-variant="variant"
    :type="type || 'button'"
    @click="handleClick"
    :class="className"
    :disabled="disabled"
    :title="title"
  >
    <slot />
  </button>
</template>

<style scoped>
button {
  appearance: none;
  display: block;
  cursor: pointer;
  border: none;
}

button:disabled {
  cursor: not-allowed;
  filter: saturate(0.6);
}

button[data-variant="transparent"] {
  background: transparent;
  padding: 0;
  color: var(--primary-text);
  line-height: 1;
}

button[data-variant="transparent"]:hover:not(:disabled) {
  color: var(--accent-red);
}

button[data-variant="round"] {
  background: transparent;
  border: 1px solid var(--accent-red);
  border-radius: 50%;
  margin: 0;
  line-height: 1;
  color: var(--accent-red);
  padding: 2px 5.5px;
  font-weight: 400;
  aspect-ratio: 1;
}

button[data-variant="round"]:hover:not(:disabled) {
  outline: 1px solid var(--accent-red);
  font-weight: 500;
}

button[data-variant="primary"],
button[data-variant="secondary"] {
  font-weight: 700;
  padding: 0.35rem 1rem;
  border-radius: 8px;
  font-size: 1.25rem;
}

button[data-variant="primary"] {
  background: var(--accent-red);
  color: var(--text-white);
}

button[data-variant="primary"]:hover:not(:disabled) {
  filter: brightness(120%);
}

button[data-variant="secondary"] {
  background: var(--tag-gray-bg);
  color: var(--accent-red);
}

button[data-variant="secondary"]:hover:not(:disabled),
button[data-variant="secondary"]:disabled {
  color: var(--primary-text);
}

button[data-variant="fancy"] {
  border-radius: 5rem;
  padding: .5rem .75rem;
  font-weight: 500;
  font-size: 1.1rem;
  color: var(--text-white);
  box-shadow: 0 0.5rem 0.3rem rgba(0, 0, 0, 0.15);
  background: var(--accent-gradient);
  background-size: 300%;
  letter-spacing: 0.03em;
}

button[data-variant="fancy"]:hover:not(:disabled) {
  box-shadow: 0 0.25rem 0.3rem rgba(0, 0, 0, 0.1);
  background-size: 100%;
  animation: disco 3s infinite both;
}
</style>
