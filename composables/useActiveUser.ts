import { FullUser, ShortUser } from "~/types/global";
import { useUserStore } from "~/stores/userStore";
import { useInteractionsStore } from "~/stores/interactionsStore";
import { composeHeader } from "~/utils/composeHeader";

const createUserEndpoint = (baseBackend: string, endpoint: string) => {
  return `${baseBackend}/profile/${endpoint}`;
}

export const useActiveUser = async () => {
  const userId = useCookie("userId");
  const jwt = useCookie("jwt");
  const router = useRouter();
  console.log(userId.value, router.currentRoute.value.path)
  if (!userId.value || !jwt.value) {
    if (router.currentRoute.value.path !== "/login") {
      await navigateTo("/login");
    } else {
      return;
    }
  }
  const config = useRuntimeConfig()
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "me")
  const store = useUserStore();
  const interactionsStore = useInteractionsStore();
  if (process.server) {
    const { data, error } = await useFetch<FullUser>(apiEndpoint, {
      ...composeHeader(jwt.value as string),
    });
    if (error.value) {
      console.error(error);
      store.setUser(null);
      interactionsStore.setInteractions(null);
    } else {
      store.setUser(data.value);
      interactionsStore.setInteractions(data.value);
    }
  }
};

export const useUpdateUser = async (userData: Partial<FullUser>) => {
  const config = useRuntimeConfig();
  const { baseBackend, xAccessKey, xMasterKey, meBinID } = config.public;
  const apiEndpoint = `${baseBackend}/b/${meBinID}?meta=false`;
  const store = useUserStore();
  const interactionsStore = useInteractionsStore();
  const updatedUser = { ...store.user, ...filterUnsetKeys(userData) };
  // console.log(JSON.stringify({ ...updatedUser }))
  const { data, error } = await useFetch<{ record: any }>(
    apiEndpoint,
    {
      method: "PUT",
      headers: {
        ["X-Master-Key"]: xMasterKey,
        ["X-Access-Key"]: xAccessKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedUser }),
    }
  );
  if (error.value) {
    console.error(error);
  } else {
    store.setUser(data.value?.record || null);
    interactionsStore.setInteractions(data.value?.record || null);
  }
};

export const useLogout = async () => {
  const userId = useCookie("userId");
  if (!userId.value) {
    return;
  } else {
    userId.value = undefined;
    await navigateTo("/");
  }
}

export const useLogin = async (username: string, password: string) => {
  const userId = useCookie("userId");
  const config = useRuntimeConfig();
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "login"); 
  const { data, error } = await useFetch<ShortUser>(
    apiEndpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  )
  if (error.value) {
    console.error(error.value);
    return { message: "Failed to log in: wrong username or password!" };
  } else {
    userId.value = data.value?.id;
    await navigateTo("/");
  }
}

export const useUpdatePassword = async (id: string, password: string) => {
  const userId = useCookie("userId");
  const config = useRuntimeConfig();
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "updatePassword");
  const { error } = await useFetch<any>(
    apiEndpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    }
  )
  if (error.value) {
    console.error(error.value);
    return { message: "Failed to update password!" };
  } else {
    userId.value = undefined;
    await navigateTo("/login");
  }
}

export const useResetPassword = async (username: string) => {
  const config = useRuntimeConfig();
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "resetPassword");
  const { error } = await useFetch<any>(
    apiEndpoint,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    }
  )
  if (error.value) {
    console.error(error.value);
    return { message: "Failed to reset password!" };
  } else {
    return { message: "Please check your email for password reset instructions." };
  }
}

export const useCheckUsername = async (username: string) => {
  const config = useRuntimeConfig();
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "checkUsername");
  const params = new URLSearchParams({ username });
  const { data, error } = await useFetch<{ exists: boolean }>(
    `${apiEndpoint}?${params.toString()}`,
  )
  if (error.value) {
    console.error(error.value);
    return { message: "Failed to check username!" };
  } else {
    return data.value?.exists || false;
  }
}