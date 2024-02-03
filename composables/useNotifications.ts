import { useNotificationStore } from "~/stores/notificationStore";
import { Notification } from "~/types/global";

// TODO: remove this when the backend is ready
const dummyNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    date: Date.now(),
    isRead: false,
    user: {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      mainImage: "https://picsum.photos/200/300",
      online: true,
      lastSeen: 123456789,
    },
  },
  {
    id: "2",
    type: "view",
    date: Date.now(),
    isRead: false,
    user: {
      id: "2",
      firstName: "Jane",
      lastName: "Doe",
      mainImage: "https://picsum.photos/200/300",
      online: true,
      lastSeen: 123456789,
    },
  },
  {
    id: "3",
    type: "message",
    date: Date.now(),
    isRead: true,
    user: {
      id: "3",
      firstName: "John",
      lastName: "Doe",
      mainImage: "https://picsum.photos/200/300",
      online: true,
      lastSeen: 123456789,
    },
  },
  {
    id: "4",
    type: "match",
    date: Date.now(),
    isRead: false,
    user: {
      id: "4",
      firstName: "Jane",
      lastName: "Doe",
      mainImage: "https://picsum.photos/200/300",
      online: true,
      lastSeen: 123456789,
    },
  },
  {
    id: "5",
    type: "unlike",
    date: Date.now(),
    isRead: true,
    user: {
      id: "5",
      firstName: "John",
      lastName: "Doe",
      mainImage: "https://picsum.photos/200/300",
      online: true,
      lastSeen: 123456789,
    },
  },
];

export const useNotifications = async () => {
  const jwt = useCookie("jwt");
  const config = useRuntimeConfig();
  const { baseBackend } = config.public;
  const store = useNotificationStore();
  const apiEndpoint = `${baseBackend}/notifications`;
  // TODO: uncomment this when the backend is ready
//   const { data, error } = await useFetch<{ notifications: Notification[] }>(
//     apiEndpoint
//   );
//   if (error.value) {
//     console.error(error.value);
//   } else {
//     store.setNotifications(data.value?.notifications || dummyNotifications);
//   }
    store.setNotifications(dummyNotifications);
};
