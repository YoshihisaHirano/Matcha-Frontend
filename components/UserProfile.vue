<script setup lang="ts">
import { CommonUserData } from '~/types/global';

interface UserProfileProps {
  user: CommonUserData | null;
}

defineProps<UserProfileProps>();
</script>

<template>
    <section class="profile-container">
        <div class="image-frame">
            <nuxt-img v-if="user?.mainImage" />
            <NoImage v-else/>
        </div>
        <div v-if="user?.id">

        </div>
        <NoData v-else/>
    </section>
</template>

<style>
.image-frame {
    border: 2px solid var(--gray-stroke);
    border-radius: 1rem;
    width: clamp(350px, 24vw, 26vw);
    aspect-ratio: 5/7;
}

.profile-container {
    display: flex;
    height: 100%;
    padding: 2rem 2.5rem 4rem 1rem;
}
</style>