import { ActiveUser, CommonUserData, EditableUserData, LocationCoords } from "~/types/global";

export const useUserStore = defineStore("user", () => {
  const user = ref<ActiveUser | null>(null);
  const actualUserLocation = ref<LocationCoords | null>(null);

  const userLocation = computed(() => {
    if (!user.value) return null;
    return user.value.location
  })

  const userCommonData = computed<CommonUserData | null>(() => {
    if (!user.value) return null;
    const commonUser: Partial<ActiveUser> = { ...user.value };
    delete commonUser.email;
    delete commonUser.emailVerified;
    delete commonUser.username;
    return commonUser as Required<CommonUserData>;
  });

  const userEditableData = computed<EditableUserData | null>(() => {
    if (!user.value) return null;
    const { firstName, lastName, dateOfBirth, location, sexPref, gender, biography } = user.value
    return { firstName, lastName, dateOfBirth, sexPref, gender, biography, location: {...location} }
  })

  const userHeaderInfo = computed(() => {
    if (!user.value) return null;
    const { firstName, lastName, mainImage } = user.value;
    return { firstName, lastName, mainImage };
  });

  const userSettings = computed(() => {
    if (!user.value) return null;
    return { email: user.value.email, username: user.value.username };
  });

  const userPictures = computed(() => {
    if (!user.value) return [];
    return [user.value.mainImage, ...user.value.pictures]
  })

  function setUser(newUser: ActiveUser | null) {
    user.value = newUser ? { ...newUser } : null;
  }

  function isUserCurrent(id: string) {
    return id === user.value?.id;
  }

  function setLocation(coords: LocationCoords | null) {
    actualUserLocation.value = coords;
  }

  return {
    user,
    userLocation,
    actualUserLocation,
    userCommonData,
    userEditableData,
    userHeaderInfo,
    userSettings,
    userPictures,
    setUser,
    isUserCurrent,
    setLocation,
  };
});
