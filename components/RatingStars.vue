<script setup lang="ts">
interface StarsProps {
  rating: number;
  className?: string;
}

const props = defineProps<StarsProps>();
const roundedRating = computed(() => props.rating.toPrecision(2));
const title = computed(() => `Fame rating is ${roundedRating.value} out of 5`);
const style = computed(() => `--rating: ${roundedRating.value}`);
</script>

<template>
  <span :style="style" :class="`star-rating ${className || ''}`" :title="title"></span>
</template>

<style scoped>
.star-rating {
  --percent: calc(var(--rating) / 5 * 100%);
  display: inline-block;
  font-size: 1.4rem;
  line-height: 1;
  padding-left: 0.25rem;
}

.star-rating::before {
  content: "★★★★★";
  letter-spacing: 3px;
  color: var(--star-color);
  background: linear-gradient(
    90deg,
    var(--accent-red) var(--percent),
    var(--star-color) var(--percent)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
