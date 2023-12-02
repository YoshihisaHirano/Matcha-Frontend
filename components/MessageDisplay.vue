<script setup lang="ts">
import { useUserStore } from "~/stores/userStore";
import { Chat } from "~/types/global";

interface MessageDisplayProps {
  chat: Chat | null;
}

const props = defineProps<MessageDisplayProps>();

const userStore = useUserStore();

const userId = computed(() => userStore.userId);
const messages = computed(() => props.chat?.messages || []);
const msgContainer = ref<HTMLDivElement | null>(null)

function displayMessageAuthor(authorId: string) {
  return authorId === userId.value
    ? "You"
    : props.chat?.user.firstName || "Them";
}

onMounted(() => {
  if (props.chat) {
      useChatMessages(props.chat.id, props.chat.pageNo);
    }
});

watch(
  () => props.chat,
  () => {
    if (props.chat) {
      useChatMessages(props.chat.id, props.chat.pageNo);
    }
  }
);

// watch(
//   () => messages.value,
//   () => {
//     if (msgContainer.value) {
//       console.log(msgContainer.value.scrollHeight)
//       msgContainer.value.scrollTo(0, msgContainer.value.scrollHeight);
//     }
//   }
// );

onUpdated(() => {
  if (msgContainer.value) {
    msgContainer.value.scrollTo(0, msgContainer.value.scrollHeight);
  }
});
</script>

<template>
  <div class="message-container" ref="msgContainer">
    <Button class-name="load-more-btn" variant="transparent">Load more</Button>
    <div
      v-if="chat"
      v-for="message in messages"
      :key="message.id"
      :id="message.id"
      :class="['message', { myMessage: message.authorId === userId }]"
    >
      <div class="message-author">
        {{ displayMessageAuthor(message.authorId) }}
      </div>
      <div class="message-content">{{ message.text }}</div>
    </div>
  </div>
</template>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  padding: 1rem 1rem;
  scroll-behavior: smooth;
}

.message-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.message-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.message {
  width: fit-content;
  max-width: 50%;
  padding: 0.35rem;
  background: var(--primary-background);
  font-weight: 500;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.message + .message {
  margin-top: 0.5rem;
}

.message.myMessage {
  margin-left: auto;
  background: var(--accent-red);
  color: var(--primary-background);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 0;
}

.message-author {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--gray-text);
}

:global(button[data-variant="transparent"].load-more-btn) {
  padding: 0.5rem 0 0.75rem;
}
</style>
