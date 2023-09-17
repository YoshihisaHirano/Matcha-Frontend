import { UserInteractions } from "~/types/global";

export const useInteractionsStore = defineStore("interactions", () => {
  const liked = ref<string[]>([]);
  const viewed = ref<string[]>([]);
  const blocked = ref<string[]>([]);
  // const reportedUsers = ref<string[]>([]);
  const likedMe = ref<string[]>([]);
  const viewedMe = ref<string[]>([]);

  const usersToShow = computed(() => {
    return Array.from(new Set([...liked.value, ...viewed.value]));
  });

  const matchedUsers = computed(() => {
    return liked.value.filter((id) => likedMe.value.includes(id));
  })

  async function useLikeUser(id: string) {
    const newLiked = liked.value.includes(id)
      ? liked.value.filter((userId) => userId !== id)
      : [...liked.value, id];
    await useUpdateUser({
      liked: newLiked,
      viewed: viewed.value,
      blocked: blocked.value,
      viewedMe: viewedMe.value,
      likedMe: likedMe.value,
    });
  }

  async function viewUser(id: string) {
    if (viewed.value.includes(id)) return;
    const newViewed = [...viewed.value, id];
    await useUpdateUser({
      viewed: newViewed,
      liked: liked.value,
      blocked: blocked.value,
      viewedMe: viewedMe.value,
      likedMe: likedMe.value,
    });
  }

  async function useBlockUser(id: string) {
    const newBlocked = blocked.value.includes(id)
      ? blocked.value.filter((userId) => userId !== id)
      : [...blocked.value, id];
    await useUpdateUser({
      blocked: newBlocked,
      liked: liked.value,
      viewed: viewed.value,
      viewedMe: viewedMe.value,
      likedMe: likedMe.value,
    });
  }

  function saveLike(id: string) {
    likedMe.value.push(id);
  }

  function saveView(id: string) {
    viewedMe.value.push(id);
  }

  function matchStatus(id: string) {
    if (likedMe.value.includes(id) && liked.value.includes(id)) {
      return 2;
    }
    if (liked.value.includes(id)) {
      return -1;
    }
    if (likedMe.value.includes(id)) {
      return 1;
    }
    return 0;
  }

  function isUserBlocked(id: string) {
    return blocked.value.includes(id);
  }

  function isUserLiked(id: string) {
    return liked.value.includes(id);
  }

  function setInteractions(data: Partial<UserInteractions> | null) {
    liked.value = data?.liked || [];
    likedMe.value = data?.likedMe || [];
    viewed.value = data?.viewed || [];
    viewedMe.value = data?.viewedMe || [];
    blocked.value = data?.blocked || [];
  }

  return {
    useLikeUser,
    viewUser,
    useBlockUser,
    matchStatus,
    isUserBlocked,
    isUserLiked,
    setInteractions,
    usersToShow,
    matchedUsers
  };
});
