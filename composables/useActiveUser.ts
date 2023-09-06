import { ActiveUser } from "~/types/global";
import { useUserStore } from "~/stores/userStore";

export const useActiveUser = async (id: string) => {
  const config = useRuntimeConfig();
  const { baseBackend, xAccessKey, xMasterKey, meBinID } = config.public;
  const apiEndpoint = `${baseBackend}/b/${meBinID}?meta=false`;
  const store = useUserStore();
  if (process.server) {
    const { data, error } = await useFetch<ActiveUser>(apiEndpoint, {
      headers: {
        ["X-Master-Key"]: xMasterKey,
        ["X-Access-Key"]: xAccessKey,
      },
    });
    if (error.value) {
      console.error(error);
      store.setUser(null);
    } else {
      store.setUser(data.value);
    }
  }
};

export const useUpdateUser = async (userData: Partial<ActiveUser>) => {
  const config = useRuntimeConfig();
  const { baseBackend, xAccessKey, xMasterKey, meBinID } = config.public;
  const apiEndpoint = `${baseBackend}/b/${meBinID}?meta=false`;
  const store = useUserStore();
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
  }
};
