<script setup lang="ts">
import { useChats } from "~/composables/useChats";

useChats();

const selectedChat = ref<string | null>(null);

function selectChat(chatId: string) {
  selectedChat.value = chatId;
}
</script>

<template>
  <div class="chats-page-container">
    <ChatList @select-chat="selectChat" />
    <ChatInterface :selected-chat="selectedChat" />
  </div>
</template>

<style scoped>
.chats-page-container {
  height: 100%;
  max-height: 91vh;
  overflow: hidden;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media screen and (min-width: 768px) {
  .chats-page-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 1rem;
  }
}
</style>
