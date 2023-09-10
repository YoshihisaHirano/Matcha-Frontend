<script setup lang="ts">
interface WordCountProps {
  maxlength: number;
  text: string;
  className?: string;
}

defineProps<WordCountProps>();
</script>

<template>
    <p :class="className || ''">{{ text.length }}/{{ maxlength }}</p>
</template>
