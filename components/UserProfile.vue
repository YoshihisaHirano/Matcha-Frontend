<script setup lang="ts">
import { CommonUserData } from "~/types/global";

interface UserProfileProps {
  user: CommonUserData | null;
}

const props = defineProps<UserProfileProps>();
const pictures = computed<string[]>(() => {
  if (props.user) {
    return [props.user.mainImage, ...props.user.pictures];
  }
  return []
});

const lastSeen = computed(() => props.user ? getStringDate(props.user.lastSeen) : '');
</script>

<template>
  <section class="profile-container">
    <PhotoGallery :pictures="pictures" :alt="user ? `A photo of ${user.firstName} ${user.lastName}` : 'No photo'" />
    <div v-if="user" class="user-info">
      <div class="user-status">
        <span v-if="!user.online">last seen {{ lastSeen }}</span>
    </div>
      <MainUserData
        :id="user.id"
        :first-name="user.firstName"
        :last-name="user.lastName"
        :gender="user.gender"
        :date-of-birth="user.dateOfBirth"
        :location="user.location"
        :sex-pref="user.sexPref"
        :tags="user.tags"
        :online="user.online"
        class-name="user-profile-main"
      />
      <div class="user-fame">
        Fame: <RatingStars :rating="user.fameRating" />
      </div>
      <section class="user-bio">
        <header>About me</header>
        <p>{{ user.biography }}</p>
      </section>
    </div>
    <NoData v-else />
  </section>
</template>

<style>
.profile-container {
  display: flex;
  height: 100%;
  padding: 2rem 2.5rem 4rem 1rem;
}

.user-info {
  padding-left: 2rem;
  max-width: 700px;
}

.user-bio {
  max-width: 90%;
}

.user-bio header {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.35rem;
}

.user-fame {
  font-size: 1.1rem;
  font-weight: 700;
  padding-bottom: 0.9rem;
}

.user-status {
    margin-bottom: 2rem;
    font-size: .9rem;
    opacity: .7;
    min-height: .9rem;
    font-weight: 600;
    position: relative;
    top: -4px
}
</style>
