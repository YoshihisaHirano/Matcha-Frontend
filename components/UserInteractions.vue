<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useInteractionsStore } from "~/stores/interactionsStore";
import { useUserStore } from "~/stores/userStore";

interface UserInteractionsProps {
  id: string;
  hideBlock?: boolean;
}

const userStore = useUserStore();
const historyStore = useInteractionsStore();

const props = defineProps<UserInteractionsProps>();
const { userId } = storeToRefs(userStore);

const userBlocked = computed(() => {
  return historyStore.isUserBlocked(props.id);
});

const likeBtnInfo = computed(() => {
  const status = historyStore.matchStatus(props.id);
  if (status === 2)
    return {
      title: "You are a match. Click to unlike",
      icon: "full-outline",
    };
  if (status === 0)
    return {
      title: "Click to like this user",
      icon: "outline",
    };
  if (status === 1)
    return {
      title: "This user liked you. Click to like back",
      icon: "half-outline",
    };
  return {
    title: "You liked this user. Click to unlike",
    icon: "half-outline",
  };
});

async function handleLike() {
  await historyStore.useLikeUser(props.id);
}

async function handleBlock() {
  await historyStore.useBlockUser(props.id);
}
</script>

<template>
  <div class="interactions-wrapper" v-if="userId !== id">
    <Button variant="round" :title="likeBtnInfo.title" @click="handleLike">
      <span :class="`typcn-heart-${likeBtnInfo.icon}`"></span>
    </Button>
    <Button
      if="!hideBlock"
      variant="round"
      :title="`${userBlocked ? 'Unblock' : 'Block'} user`"
      @click="handleBlock"
    >
      <span :class="`typcn-cancel${userBlocked ? '' : '-outline'}`"></span>
    </Button>
  </div>
</template>

<style scoped>
.interactions-wrapper {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
</style>
