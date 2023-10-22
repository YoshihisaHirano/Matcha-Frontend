<script setup lang="ts">
import { useChatStore } from "~/stores/chatStore";

const chats = computed(() => useChatStore().allChats);

const emits = defineEmits(["selectChat"]);

function selectChat(chatId: string) {
  emits("selectChat", chatId);
}
</script>

<template>
  <div class="chat-list-container">
    <h2>Chats</h2>
    <ul>
      <li
        class="chat-card"
        v-for="chat in chats"
        :key="chat.id"
        @click="() => selectChat(chat.id)"
      >
        <div class="user-info-container">
          <SmallUserPicture :image="chat.user.mainImage" />
          <CustomLink internal :href="`/users/${chat.user.id}`">
            <span class="chat-list-username"
              >{{ chat.user.firstName }} {{ chat.user.lastName }}</span
            >
          </CustomLink>
        </div>
        <OnlineIndicator :is-online="chat.user.online" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.chat-list-container {
  background: var(--chat-interface-bg);
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
}

.chat-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  background: var(--tag-gray-bg);
}

.chat-card + .chat-card {
  margin-top: 0.5rem;
}

.chat-card:hover,
.chat-card:active {
  background: var(--star-color);
}

a:hover .chat-list-username {
  text-decoration: underline;
  text-underline-offset: 4px;
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.user-info-container {
  display: flex;
}
</style>
