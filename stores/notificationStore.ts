import { Notification } from "~/types/global";

export const useNotificationStore = defineStore("notification", () => {
  const hasUnreadNotifications = ref(false);
  const notifications = ref<Map<string, Notification>>(new Map());

  function setHasUnread(value: boolean) {
    hasUnreadNotifications.value = value;
  }

  function addNotification(notification: Notification) {
    notifications.value.set(notification.id, notification);
  }

  function setNotifications(notifications: Notification[]) {
    notifications.forEach((notification) => {
      addNotification(notification);
    });
  }

  function readNotification(notificationId: string) {
    const notification = notifications.value.get(notificationId);
    if (notification) {
      notification.isRead = true;
    }
  }

  function readAllNotifications() {
    notifications.value.forEach((notification) => {
      notification.isRead = true;
    });
  }

  return {
    notifications,
    addNotification,
    readNotification,
    setNotifications,
    hasUnreadNotifications,
    setHasUnread
  };
});
