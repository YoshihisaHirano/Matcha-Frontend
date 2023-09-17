<script setup lang="ts">
import { useInteractionsStore } from "~/stores/interactionsStore";
import { ShortUser } from "~/types/global";

interface UserHistoryCardProps {
  user: ShortUser;
  className?: string;
}

const props = defineProps<UserHistoryCardProps>();
const store = useInteractionsStore();

const likeInfo = computed(() => {
  return matchStatus[store.matchStatus(props.user.id)];
});
</script>

<template>
  <CustomLink internal :href="`/users/${user.id}`">
    <article class="history-card">
      <span
        v-if="likeInfo.titleShort"
        :title="likeInfo.titleShort"
        :class="`typcn-heart-${likeInfo.icon} like-status-indicator`"
      ></span>
      <img
        :src="user.mainImage"
        :alt="`${user.firstName} ${user.lastName} profile picture`"
        class="profile-pic"
      />
      <UserNameAge
        :first-name="user.firstName"
        :last-name="user.lastName"
        :online="user.online"
        class-name="history-card-info"
      />
    </article>
  </CustomLink>
</template>

<style scoped>
.history-card {
  position: relative;
  width: clamp(220px, 30%, 270px);
  aspect-ratio: 5/7;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px -27px 19px 17px rgba(104, 23, 23, 0.85) inset;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.history-card-info {
  position: relative;
  z-index: 3;
  padding: 0.35rem 0.55rem;
  font-size: 1.5rem;
  color: var(--text-white);
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
}

.like-status-indicator {
  position: absolute;
  top: 0.3rem;
  right: 0.5rem;
  color: var(--text-white);
  text-shadow: 2px 2px 20px rgba(104, 23, 23, 0.85);
}
</style>
