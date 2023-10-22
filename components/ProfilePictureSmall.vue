<script setup lang="ts">
interface ProfileSmallProps {
  username?: string;
  image?: string;
}

defineProps<ProfileSmallProps>();
</script>

<template>
  <CustomLink internal href="/profile" class-name="profile-link">
    <div class="user-info-container">
      <span class="username">{{ username || "" }}</span>
      <SmallUserPicture :image="image" />
    </div>
  </CustomLink>
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

.username {
  display: none;
}

@media screen and (min-width: 1024px) {
  .username {
    display: block;
  }
}
</style>
