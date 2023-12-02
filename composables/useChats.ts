import { useChatStore } from "~/stores/chatStore";
import { useUserStore } from "~/stores/userStore";
import { Chat, Message } from "~/types/global";

export const useChats = async () => {
  const userId = useUserStore().userId;
  console.log(userId);
  if (!userId) return;
  const config = useRuntimeConfig();
  console.log(process);
  const { baseBackend, xAccessKey, xMasterKey, chatBinID } = config.public;
  const apiEndpoint = `${baseBackend}/b/${chatBinID}?meta=false`;
  const store = useChatStore();
    const { data, error } = await useFetch<Chat[]>(apiEndpoint, {
      headers: {
        ["X-Master-Key"]: xMasterKey,
        ["X-Access-Key"]: xAccessKey,
      },
    });
    if (error.value) {
      console.error(error);
    } else {
      data.value?.forEach((chat) => {
        store.addChat({ ...chat, messages: [], pageNo: 1 });
      });
    }
};

export const useChatMessages = async (chatId: string, pageNo: number, loadMore = false) => {
  const config = useRuntimeConfig();
  const { baseBackend, xAccessKey, xMasterKey, messageBinID } = config.public;
  const apiEndpoint = `${baseBackend}/b/${messageBinID}?meta=false&query=chatId:${chatId}`;
  const store = useChatStore();
  const chatMessages = store.getChat(chatId)?.messages || [];
  if (!loadMore && chatMessages.length > 0) return;
    const { data, error } = await useFetch<Message[]>(apiEndpoint, {
      headers: {
        ["X-Master-Key"]: xMasterKey,
        ["X-Access-Key"]: xAccessKey,
      },
    });
    
    if (error.value) {
      console.error(error);
    } else {
      const messages = data.value || [];
      if (messages.length > 0) {
        store.addMessages(chatId, messages);
        store.incrementPageNo(chatId);
      }
    }
};
