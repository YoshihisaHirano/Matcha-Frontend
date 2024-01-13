import { io } from "socket.io-client";
import { useNotificationStore } from "~/stores/notificationStore";
import { Notification } from "~/types/global";
import { toast } from "vue3-toastify";
import ToastNotification from "~/components/ToastNotification.vue";
import { h } from "vue";

export const useNotificationSocket = () => {
  const config = useRuntimeConfig();
  const notificationStore = useNotificationStore();
  const { baseSocket } = config.public;
  const socket = io(`${baseSocket}/notifications`, {
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("connected to notification socket");
  });

  socket.on("disconnect", () => {
    console.log("disconnected from notification socket");
  });

  function readNotifications(ids: string) {
    socket.emit("read", ids);
  }

  socket.on("notification", (notification: Notification) => {
    console.log("notification", notification);
    notificationStore.addNotification(notification);
    notificationStore.setHasUnread(true);
    nextTick(() => {
      toast(() => h(ToastNotification, { notification }));
    });
  });

  return { readNotifications };
};
