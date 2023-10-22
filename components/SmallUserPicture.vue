<script setup lang="ts">
import defaultImg from "assets/images/defaultUserPic.svg";

interface SmallUserPictureProps {
  image?: string;
}

withDefaults(defineProps<SmallUserPictureProps>(), {
  image: defaultImg,
});
</script>

<template>
  <div class="image-container">
    <img :src="image" alt="User profile picture" />
  </div>
</template>

<style scoped>
.image-container {
  border: 2px solid var(--gray-stroke);
  border-radius: 50%;
  height: 2.25rem;
  width: 2.25rem;
  aspect-ratio: 1;
  flex: 0 0 auto;
  overflow: hidden;
}

.image-container > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
