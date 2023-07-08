<script setup lang="ts">
// import defaultPic from '~/assets/images/'

interface ProfileSmallProps {
  username?: string;
  image?: string;
}

withDefaults(defineProps<ProfileSmallProps>(), {
  username: "",
  image: "~/assets/images/defaultUserPic.svg",
});
</script>

<template>
  <div class="user-info-container">
    <p>{{ username }}</p>
    <div class="image-container">
      <img :src="image" alt="User profile picture" />
    </div>
  </div>
</template>

<style scope>
.user-info-container {
  display: flex;
}

.image-container {
  border: 2px solid var(--primary-text);
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
}
</style>
