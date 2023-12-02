<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useInteractionsStore } from "~/stores/interactionsStore";
import { ShortUser } from "~/types/global";

const store = useInteractionsStore();

useSeoMeta({
  title: "Likes | Matcha",
});

const onlyViews = ref(false);
const onlyLikes = ref(false);

const { usersToShow } = storeToRefs(store);
const users = ref<ShortUser[]>([]);
users.value = (await useUsersList(usersToShow.value)).data.value || [];

watchEffect(async () => {
  users.value = (await useUsersList(usersToShow.value)).data.value || [];
  if (!users.value) {
    users.value = [];
  }
});

const displayedUsers = computed(() => {
  if (!users.value) return [];
  if (onlyLikes.value) {
    return users.value.filter((user) => store.isUserLiked(user.id));
  } else if (onlyViews.value) {
    return users.value.filter((user) => !store.isUserLiked(user.id));
  } else {
    return users.value;
  }
});

function handleLikesOnly() {
  onlyLikes.value = !onlyLikes.value;
  onlyViews.value = false;
}

function handleViewsOnly() {
  onlyViews.value = !onlyViews.value;
  onlyLikes.value = false;
}
</script>

<template>
  <div class="history-filters">
    <Button
      @click="handleLikesOnly"
      title="Likes only"
      variant="round"
      :class-name="`${onlyLikes ? 'active-filter' : ''}`"
    >
      <span class="typcn-heart"></span>
    </Button>
    <Button
      @click="handleViewsOnly"
      title="Views only"
      variant="round"
      :class-name="`${onlyViews ? 'active-filter' : ''}`"
    >
      <span class="typcn-eye"></span>
    </Button>
  </div>
  <div v-if="displayedUsers" class="history-container">
    <UserHistoryCard
      v-for="user in displayedUsers"
      :key="user.id"
      :user="user"
    />
    <UserHistoryCard
      v-for="user in displayedUsers"
      :key="user.id"
      :user="user"
    />
  </div>
</template>

<style scoped>
.history-container {
  display: flex;
  flex-wrap: wrap;
  height: 90%;
  overflow-y: auto;
  padding-top: 1rem;
  gap: 1rem;
  justify-content: center;
}

.history-filters {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  justify-content: flex-end;
}

.active-filter[data-variant="round"] {
  color: var(--primary-background);
  background-color: var(--accent-red);
  border-color: var(--primary-background);
}

@media screen and (min-width: 768px) {
  .history-container {
    justify-content: flex-start;
  }
}
</style>
