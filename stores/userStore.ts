import { ActiveUser, CommonUserData } from "~/types/global";

export const useUserStore = defineStore("user", () => {
  const user = ref<ActiveUser | null>(null);

  const userCommonData = computed<CommonUserData | null>(() => {
    if (!user.value) return null;
    const commonUser: Partial<ActiveUser> = { ...user.value };
    delete commonUser.email;
    delete commonUser.emailVerified;
    delete commonUser.username;
    return commonUser as Required<CommonUserData>;
  });

  const userHeaderInfo = computed(() => {
    if (!user.value) return null;
    const { firstName, lastName, mainImage } = user.value;
    return { firstName, lastName, mainImage };
  });

  function setUser(newUser: ActiveUser | null) {
    user.value = newUser ? { ...newUser } : null;
  }

  function isUserCurrent(id: string) {
    return id === user.value?.id;
  }

  return { user, userCommonData, userHeaderInfo, setUser, isUserCurrent };
});
