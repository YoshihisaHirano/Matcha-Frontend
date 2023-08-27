<script setup lang="ts">
interface FramedImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const props = defineProps<FramedImageProps>();
const emits = defineEmits(['click'])

function handleClick() {
    emits('click', props.src);
}
</script>

<template>
  <div @click="handleClick" :class="`image-frame ${className || ''}`">
    <slot/>
    <img :src="src" :alt="alt || ''" loading="lazy" decoding="async" />
  </div>
</template>

<style scoped>
.image-frame {
  border: 2px solid var(--gray-stroke);
  border-radius: 1rem;
  aspect-ratio: var(--photo-aspect-ratio);
  overflow: hidden;
  max-width: 370px;
}

img {
    object-fit: cover;
    height: 100%;
}
</style>
