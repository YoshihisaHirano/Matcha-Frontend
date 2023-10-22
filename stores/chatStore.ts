import { Chat, Message } from "~/types/global";

type ChatMap = Map<string, Chat>;

export const useChatStore = defineStore("chat", () => {
  const chats = ref<ChatMap>(new Map());

  const allChats = computed(() => {
    return Array.from(chats.value.values());
  })

  function addChat(chat: Chat) {
    chats.value.set(chat.id, chat);
  }

  function incrementPageNo(chatId: string) {
    const chat = chats.value.get(chatId);
    if (chat) {
      chat.pageNo++;
    }
  }

  function addMessages(chatId: string, messages: Message | Message[]) {
    const chat = chats.value.get(chatId);
    if (chat) {
        if (Array.isArray(messages)) {
            chat.messages = [...messages, ...chat.messages];
        } else {
            chat.messages = [messages, ...chat.messages];
        }
    }
  }

  function getChat(chatId: string) {
    return chats.value.get(chatId) || null;
  }

  function reset() {
    chats.value = new Map();
  }

  return {
    chats,
    addChat,
    addMessages,
    getChat,
    allChats,
    incrementPageNo,
    reset,
  };
});
