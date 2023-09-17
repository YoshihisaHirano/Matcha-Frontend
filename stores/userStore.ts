import {
  ActiveUser,
  CommonUserData,
  EditableUserData,
  LocationCoords,
} from "~/types/global";

export const useUserStore = defineStore("user", () => {
  const user = ref<ActiveUser | null>(null);
  const actualUserLocation = ref<LocationCoords | null>(null);

  const userLocation = computed(() => {
    if (!user.value) return null;
    return user.value.location;
  });

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
    const {
      firstName,
      lastName,
      dateOfBirth,
      location,
      sexPref,
      gender,
      biography,
    } = user.value;
    return {
      firstName,
      lastName,
      dateOfBirth,
      sexPref,
      gender,
      biography,
      location: { ...location },
    };
  });

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
    return [user.value.mainImage, ...user.value.pictures];
  });

  const filterData = computed(() => {
    if (!user.value) return null;
    return {
      fame: user.value.fameRating,
      age: getAge(user.value.dateOfBirth),
      location: coordsToArr(user.value.location),
    };
  });

  const userId = computed(() => {
    if (!user.value) return null;
    return user.value.id;
  });

  function setUser(newUser: Partial<ActiveUser> | null) {
    user.value = newUser ? { 
      firstName: newUser.firstName || '',
      lastName: newUser.lastName || '',
      email: newUser.email || '',
      emailVerified: newUser.emailVerified || false,
      username: newUser.username || '',
      biography: newUser.biography || '',
      tags: newUser.tags || [],
      location: newUser.location || { lat: 40, lon: 40 },
      dateOfBirth: newUser.dateOfBirth || 0,
      mainImage: newUser.mainImage || '',
      pictures: newUser.pictures || [],
      fameRating: newUser.fameRating || 0,
      sexPref: newUser.sexPref || 'both',
      gender: newUser.gender || 'other',
      id: newUser.id || 'error-in-fetching-user',
      lastSeen: newUser.lastSeen || 0,
      online: newUser.online || false,
     } : null;
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
    filterData,
    userId,
    setUser,
    isUserCurrent,
    setLocation,
  };
});
