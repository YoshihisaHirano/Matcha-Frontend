<script setup lang="ts">
interface InputProps {
  label: string;
  icon?: string;
  lableClassName?: string;
  id: string;
  required?: boolean;
  className?: string;
  name: string;
  type?: string;
  placeholder?: string;
  modelValue?: string;
}

defineProps<InputProps>();
defineEmits(["update:modelValue"]);
</script>

<template>
  <label :class="`form-label ${lableClassName}`" :for="id">
    <span :class="`typicons-${icon}`">{{ label }}</span>
    <input
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event?.target as HTMLInputElement).value)
      "
      :required="required"
      :class="`form-input ${className}`"
      :id="id"
      :name="name"
      :type="type"
      :placeholder="placeholder"
    />
  </label>
</template>

<style scoped>
.form-label {
  display: block;
  font-size: 1.5rem;
}

.form-input {
  display: block;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 0.5rem 1rem;
}

.form-label:last-of-type {
  margin-bottom: 2.5rem;
}
</style>
