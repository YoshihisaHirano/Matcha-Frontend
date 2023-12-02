<script setup lang="ts">
import { useChatStore } from "~/stores/chatStore";

const chats = computed(() => useChatStore().allChats);
const chatsOpen = ref(true);

const emits = defineEmits(["selectChat"]);

function selectChat(chatId: string) {
  emits("selectChat", chatId);
}

function toggleChats() {
  chatsOpen.value = !chatsOpen.value;
}
</script>

<template>
  <div class="chat-list-container">
    <div class="heading-container">
      <h2>Chats</h2>
      <Button variant="transparent" @click="toggleChats">
        <span class="typcn-chevron-right"></span>
      </Button>
    </div>
    <ul :class="['chat-list', { hidden: !chatsOpen }]">
      <li
        class="chat-card"
        v-for="chat in chats"
        :key="chat.id"
        @click="() => selectChat(chat.id)"
      >
        <div class="user-info-container">
          <SmallUserPicture :image="chat.user.mainImage" />
          <!-- <CustomLink internal :href="`/users/${chat.user.id}`"> -->
            <span class="chat-list-username"
              >{{ chat.user.firstName }} {{ chat.user.lastName }}</span
            >
          <!-- </CustomLink> -->
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
  font-size: 1rem;
}

.user-info-container {
  display: flex;
}

.heading-container {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
}

.chat-list {
  margin-top: 1rem;
}

.heading-container span {
  line-height: 1;
}

.heading-container button {
  display: block;
  transform: rotate(90deg);
}

.hidden {
  display: none;
}

@media screen and (min-width: 768px) {
  .heading-container button {
    display: none;
  }

  .heading-container h2 {
    font-size: 1.5rem;
  }
}
</style>
