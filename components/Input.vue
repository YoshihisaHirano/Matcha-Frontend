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
  modelValue?: string | number;
  isTextarea?: boolean;
  maxlength?: number;
  error?: string;
  withErrors?: boolean;
  rows?: number;
  disabled?: boolean;
}

defineProps<InputProps>();
defineEmits(["update:modelValue"]);
</script>

<template>
  <label :class="`form-label ${lableClassName || ''}`" :for="id">
    <span :class="`typcn-${icon}`">{{ label }}</span>
    <textarea
      v-if="isTextarea"
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
      cols="50"
      :rows="rows || 8"
      :maxlength="maxlength"
      :disabled="disabled"
    >
    </textarea>
    <input
      v-else
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
      :disabled="disabled"
    />
    <span v-if="withErrors" class="input-error">{{ error || "&nbsp;" }}</span>
  </label>
</template>

<style scoped>
.form-label {
  display: block;
  font-size: 1.25rem;
  color: var(--primary-text);
  width: 100%;
}

.form-input {
  display: block;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 0.35rem 1rem;
  color: var(--primary-text);
  background-color: var(--input-bg);
  max-width: 100%;
}

.input-error {
  line-height: 1;
  font-size: .9rem;
  color: var(--accent-red);
  font-weight: 500;
}
</style>
