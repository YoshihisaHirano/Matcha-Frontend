import { io } from "socket.io-client";
import { useChatStore } from "~/stores/chatStore";
import { Message } from "~/types/global";

export const useChatSocket = () => {
  const chatStore = useChatStore();
  const config = useRuntimeConfig();
  const { baseSocket } = config.public;
  const socket = io(`${baseSocket}/chats`, { transports: ["websocket"] });

  socket.on("connect", () => {
    console.log("connected to chat socket");
  });

  socket.on("disconnect", () => {
    console.log("disconnected from chat socket");
  });

  socket.on("message", (message: Message) => {
    chatStore.addMessages(message.chatId, message);
  });

  function sendMessage(message: Message) {
    socket.emit("message", message);
  }

  return { sendMessage };
};
