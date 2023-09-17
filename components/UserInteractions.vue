<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useInteractionsStore } from "~/stores/interactionsStore";
import { useUserStore } from "~/stores/userStore";

interface UserInteractionsProps {
  id: string;
  className?: string;
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
  return matchStatus[status];
});

async function handleLike(e: Event) {
  e.stopPropagation();
  await historyStore.useLikeUser(props.id);
}

async function handleBlock(e: Event) {
  e.stopPropagation();
  await historyStore.useBlockUser(props.id);
}
</script>

<template>
  <div :class="`interactions-wrapper ${className || ''}`" v-if="userId !== id">
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
