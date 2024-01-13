import { FullUser, ShortUser, SignupUserData } from "~/types/global";
import { useUserStore } from "~/stores/userStore";
import { useInteractionsStore } from "~/stores/interactionsStore";

const createUserEndpoint = (baseBackend: string, endpoint: string) => {
  return `${baseBackend}/profile/${endpoint}`;
};

export const useActiveUser = async () => {
  const userId = useCookie("userId");
  const jwt = useCookie("jwt");
  const router = useRouter();
  if (!userId.value || !jwt.value) {
    if (router.currentRoute.value.path !== "/login") {
      return router.push({ path: "/login" });
    } else {
      return;
    }
  }
  const config = useRuntimeConfig();
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "me");
  const store = useUserStore();
  const interactionsStore = useInteractionsStore();
  if (process.server) {
    const { data, error } = await useFetch<FullUser>(
      `${apiEndpoint}?id=${userId.value}`
      // {
      //   ...composeHeader(jwt.value as string),
      // }
    );
    console.log(data.value);
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
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "edit");
  const store = useUserStore();
  const interactionsStore = useInteractionsStore();
  const updatedUser = { ...store.user, ...filterUnsetKeys(userData) };
  // console.log(JSON.stringify({ ...updatedUser }))
  const { data, error } = await useFetch<{ record: any }>(apiEndpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...updatedUser }),
  });
  if (error.value) {
    console.error(error.value);
  } else {
    store.setUser(data.value?.record || null);
    interactionsStore.setInteractions(data.value?.record || null);
  }
};

export const useLogout = async () => {
  const userId = useCookie("userId");
  const router = useRouter();
  if (!userId.value) {
    return;
  } else {
    userId.value = undefined;
    await router.push({ path: "/login" });
  }
};

export const useLogin = async (username: string, password: string) => {
  const userId = useCookie("userId");
  const jwt = useCookie("jwt");
  const config = useRuntimeConfig();
  const router = useRouter();
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "login");
  const { data, error } = await useFetch<ShortUser>(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (error.value) {
    console.error(error.value);
    return { message: "Failed to log in: wrong username or password!" };
  } else {
    userId.value = data.value?.id;
    // TODO: remove
    jwt.value = "DELETE ME";
    await router.push({ path: "/" });
  }
};

export const useUpdatePassword = async (id: string, password: string) => {
  const userId = useCookie("userId");
  const config = useRuntimeConfig();
  const router = useRouter();
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "updatePassword");
  const { error } = await useFetch<any>(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, password }),
  });
  if (error.value) {
    console.error(error.value);
    return { message: "Failed to update password!" };
  } else {
    userId.value = undefined;
    onNuxtReady(async () => {
      await router.push({ path: "/login" });
    });
  }
};

export const useResetPassword = async (username: string) => {
  const config = useRuntimeConfig();
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "resetPassword");
  const { error } = await useFetch<any>(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  if (error.value) {
    console.error(error.value);
    return { message: "Failed to reset password!" };
  } else {
    return {
      message: "Please check your email for password reset instructions.",
    };
  }
};

export const useCheckUsername = async (username: string) => {
  const config = useRuntimeConfig();
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "checkUsername");
  const params = new URLSearchParams({ username });
  const { data, error } = await useFetch<{ exists: boolean }>(
    `${apiEndpoint}?${params.toString()}`
  );
  if (error.value) {
    console.error(error.value);
    return { message: "Failed to check username!" };
  } else {
    return data.value?.exists || false;
  }
};

export const useRegister = async (user: SignupUserData) => {
  const userId = useCookie("userId");
  const jwt = useCookie("jwt");
  const config = useRuntimeConfig();
  const router = useRouter();
  const { baseBackend } = config.public;
  const apiEndpoint = createUserEndpoint(baseBackend, "register");
  const { data, error } = await useFetch<ShortUser>(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (error.value) {
    console.error(error.value);
    if (error.value.statusCode === 400) {
      return { message: "A user with this email already exists!" };
    }
    return { message: "Failed to sign up!" };
  } else {
    userId.value = data.value?.id;
    // TODO: remove
    jwt.value = "DELETE ME";
    await router.push({ path: "/" });
  }
};

export const useResendEmail = async (id: string) => {
  const config = useRuntimeConfig();
  const { baseBackend } = config.public;
  const apiEndpoint = `${createUserEndpoint(
    baseBackend,
    "resendEmail"
  )}?id=${id}`;
  const { error } = await useFetch<any>(apiEndpoint);
  if (error.value) {
    console.error(error.value);
    return { message: "Failed to resend email!" };
  } else {
    return { message: "Email sent!" };
  }
};
