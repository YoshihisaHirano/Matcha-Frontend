<script setup lang="ts">
import { CommonUserData } from "~/types/global";

interface UserProfileProps {
  user: CommonUserData | null;
}

const props = defineProps<UserProfileProps>();

const route = useRoute();

const lastSeen = computed(() =>
  props.user ? getStringDate(props.user.lastSeen) : ""
);
const isCurrentUser = computed(
  () => !!(route.path === "/profile" && props.user?.id)
);

const userPics = computed(() => {
  if (isCurrentUser.value || !props.user) return undefined;
  return [props.user.mainImage, ...props.user.pictures];
});

async function deleteTag(tag: string) {
  if (props.user?.tags) {
    await useUpdateUser({
      tags: props.user.tags.filter((item) => item !== tag),
    });
  }
}

async function updateTags(tags: string[]) {
  if (props.user?.tags) {
    await useUpdateUser({ tags });
  }
}
</script>

<template>
  <section class="profile-container">
    <PhotoGallery
      :is-current-user="isCurrentUser"
      :alt="user ? `A photo of ${user.firstName} ${user.lastName}` : 'No photo'"
      :pictures="userPics"
    />
    <div v-if="user" class="user-info">
      <div class="user-status">
        <span v-if="!user.online && !isCurrentUser"
          >last seen {{ lastSeen }}</span
        >
        <ProfileUpdate v-if="isCurrentUser" />
      </div>
      <UserLocation :location="user.location" class-name="profile-location" />
      <div class="name-age-wrapper">
        <UserNameAge
          :first-name="user.firstName"
          :last-name="user.lastName"
          :date-of-birth="user.dateOfBirth"
          :online="user.online"
        />
        <UserInteractions v-if="!isCurrentUser" :id="user.id" />
      </div>
      <UserGender :gender="user.gender" :sex-pref="user.sexPref" />
      <div class="user-fame">
        Fame: <RatingStars :rating="user.fameRating" />
      </div>
      <TagList
        modal-title="Add things that characterize you"
        :tags="user.tags"
        class-name="profile-tags"
        :show-delete="isCurrentUser && user.tags.length > 1"
        :show-add="isCurrentUser && user.tags.length < 10"
        can-add-tags
        @delete-tag="deleteTag"
        @update-tags="updateTags"
      />
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
  max-width: 650px;
  position: relative;
}

.user-status button.edit-btn {
  position: absolute;
  top: 4px;
  left: 0;
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
  font-size: 0.9rem;
  opacity: 0.7;
  min-height: 1.2rem;
  font-weight: 600;
  position: relative;
  top: -4px;
}

.profile-location {
  margin-bottom: 0.75rem;
}

.profile-tags {
  margin-bottom: 1rem;
}

.name-age-wrapper {
  display: flex;
  margin-bottom: .65rem;
  gap: 1rem;
}

.name-age-wrapper .main-user-info {
  margin-bottom: 0;
}
</style>
