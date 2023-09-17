import { FullUser } from "~/types/global";
import { useUserStore } from "~/stores/userStore";
import { useInteractionsStore } from "~/stores/interactionsStore";

export const useActiveUser = async (id: string) => {
  const config = useRuntimeConfig();
  const { baseBackend, xAccessKey, xMasterKey, meBinID } = config.public;
  const apiEndpoint = `${baseBackend}/b/${meBinID}?meta=false`;
  const store = useUserStore();
  const interactionsStore = useInteractionsStore();
  if (process.server) {
    const { data, error } = await useFetch<FullUser>(apiEndpoint, {
      headers: {
        ["X-Master-Key"]: xMasterKey,
        ["X-Access-Key"]: xAccessKey,
      },
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
