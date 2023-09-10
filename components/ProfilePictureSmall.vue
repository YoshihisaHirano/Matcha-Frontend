<script setup lang="ts">
import defaultImg from 'assets/images/defaultUserPic.svg'

interface ProfileSmallProps {
  username?: string;
  image?: string;
}

withDefaults(defineProps<ProfileSmallProps>(), {
  username: "",
  image: defaultImg,
});
</script>

<template>
  <div class="user-info-container">
    <CustomLink internal href="/profile" class-name="profile-link">{{ username }}</CustomLink>
    <div class="image-container">
      <img :src="image" alt="User profile picture" />
    </div>
  </div>
</template>

<style scope>
.user-info-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info-container > .profile-link:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.image-container {
  border: 2px solid var(--gray-stroke);
  border-radius: 50%;
  height: 2.25rem;
  width: 2.25rem;
  overflow: hidden;
}

.image-container > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
