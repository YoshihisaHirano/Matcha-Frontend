<script setup lang="ts">
import { useChatStore } from "~/stores/chatStore";
import { useInteractionsStore } from "~/stores/interactionsStore";

interface ChatInterfaceProps {
  selectedChat: string | null;
}

const store = useChatStore();
const interactions = useInteractionsStore();
const message = ref("");

const props = defineProps<ChatInterfaceProps>();

const chat = computed(() => {
  if (!props.selectedChat) return null;
  return store.getChat(props.selectedChat);
});

const user = computed(() => {
  if (!chat.value) return null;
  return chat.value.user;
});

const blockDisabled = computed(() => {
  if (!chat.value) return true;
  return interactions.isUserBlocked(chat.value.user.id);
});

function addEmoji(emoji: string) {
  message.value += emoji;
}

function sendMessage() {
  if (!message.value) return;
  console.log(message.value);
}

watch(
  () => props.selectedChat,
  () => {
    message.value = "";
  }
);
</script>

<template>
  <div class="chat-interface-container" v-if="chat && user">
    <div class="chat-interface-header">
      <div class="chat-info">
        <h2 :class="{ blocked: blockDisabled }">Chat with {{ user.firstName }}</h2>
        <SmallUserPicture :image="user.mainImage" />
        <OnlineIndicator show-last-seen :last-seen="user.lastSeen" :is-online="user.online" />
      </div>
      <UserInteractions hide-like :id="user.id" />
    </div>
    <MessageDisplay :chat="chat" />
    <div class="chat-controls">
      <Input
        placeholder="Your message here"
        :rows="3"
        class-name="message-input"
        id="message"
        name="message"
        label=""
        is-textarea
        v-model="message"
        :disabled="blockDisabled"
      />
      <Button
        :disabled="blockDisabled || !message"
        @click="sendMessage"
        variant="primary"
      >
        <span class="typcn-mail"></span>
      </Button>
      <CustomEmojiPicker :disabled="blockDisabled" @select-emoji="addEmoji" />
    </div>
  </div>
</template>

<style scoped>
.chat-interface-container {
  background: var(--chat-interface-bg);
  filter: brightness(0.97);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  display: grid;
  grid-template-rows: 1fr 6fr 2fr;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
}

.chat-interface-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.65rem;
}

.chat-info {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.chat-interface-header h2 {
  font-weight: 500;
}

.chat-interface-header h2.blocked {
  text-decoration: line-through;
}

.chat-controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

:global(.message-input) {
  max-height: 130px;
}

.message-display {
  grid-column-start: 2;
  grid-column-end: 7;
}
</style>
