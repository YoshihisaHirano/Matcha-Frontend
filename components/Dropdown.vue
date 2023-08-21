<script setup lang="ts">
interface DropdownProps {
  label: string;
  options: string[];
  modelValue?: string;
}

defineProps<DropdownProps>();
const emitVal = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);

function selectOption(option: string) {
  emitVal("update:modelValue", option);
  isOpen.value = false;
}

useOutsideClick([containerRef], () => {
  isOpen.value = false;
});
</script>

<template>
  <div class="container" ref="containerRef">
    <span aria-label="dropdown label" class="dropdown-label">{{ label }}</span>
    <div class="dropdown">
      <button @click="isOpen = !isOpen">
        {{ modelValue || "" }}
        <span :class="['typicons-next', 'dropdown-chevron', {rotated: isOpen}]"></span>
      </button>
      <ul v-if="isOpen" class="dropdown-list" tabindex="1">
        <li
          tabindex="1"
          v-for="(option, index) in options"
          :key="`${index}-${kebabCase(option)}`"
          @click="selectOption(option)"
          :class="{ active: modelValue === option }"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
.dropdown {
  width: 100%;
  text-transform: capitalize;
  position: relative;
}

.dropdown-chevron {
  position: absolute;
  line-height: 1;
  max-height: 1rem;
  right: 0.35rem;
  top: 50%;
  opacity: .9;
  transition: transform .2s ease-in-out;
  transform: translateY(-50%) rotate(90deg);
}

.dropdown-chevron.rotated {
  transform: translateY(-50%) rotate(270deg);
}

.dropdown-label {
  font-size: 1.25rem;
  color: var(--primary-text);
}

.dropdown button {
  border: none;
  cursor: pointer;
  display: block;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 0.35rem 1rem;
  color: var(--primary-text);
  background-color: var(--input-bg);
  text-align: left;
  text-transform: capitalize;
  font-weight: 400;
  font-size: 1rem;
  position: relative;
  z-index: 4;
}

.dropdown-list {
  position: absolute;
  list-style: none;
  z-index: 3;
  width: 100%;
  padding-left: 0;
  top: 1.7rem;
  padding-top: 0.5rem;
}

.dropdown-list li {
  padding: 0.35rem 1rem;
  color: var(--primary-text);
  background-color: var(--input-bg);
  width: 100%;
  cursor: pointer;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.dropdown-list li + li {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.dropdown-list li.active {
  filter: brightness(0.95);
}

.dropdown-list li:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
