export const useHistoryStore = defineStore("history", () => {
  const likedUsers = ref<string[]>([]);
  const viewedUsers = ref<string[]>([]);
  const blockedUsers = ref<string[]>([]);
  // const reportedUsers = ref<string[]>([]);
  const likedMe = ref<string[]>([]);
  const viewedMe = ref<string[]>([]);

  function useLikeUser(id: string) {
    if (!likedUsers.value.includes(id)) {
        likedUsers.value.push(id);
        return 'like';
    } else {
        likedUsers.value = likedUsers.value.filter((userId) => userId !== id);
        return 'unlike';
    }
  }

  function viewUser(id: string) {
    viewedUsers.value.push(id);
  }

  function useBlockUser(id: string) {
    if (!blockedUsers.value.includes(id)) {
        blockedUsers.value.push(id);
        return 'block';
    } else {
        blockedUsers.value = blockedUsers.value.filter((userId) => userId !== id);
        return 'unblock';
    }
  }

  function saveLike(id: string) {
    likedMe.value.push(id);
  }

  function saveView(id: string) {
    viewedMe.value.push(id);
  }

  function matchStatus(id: string) {
    if (likedMe.value.includes(id) && likedUsers.value.includes(id)) {
      return 2;
    }
    if (likedUsers.value.includes(id)) {
      return -1;
    }
    if (likedMe.value.includes(id)) {
      return 1;
    }
    return 0;
  }

  return {
    useLikeUser,
    viewUser,
    useBlockUser,
    matchStatus
  };
});
