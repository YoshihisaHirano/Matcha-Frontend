import { ActiveUser } from "~/types/global";
import { useUserStore } from "~/stores/userStore";

export const useActiveUser = async (id: string) => {
  const config = useRuntimeConfig();
  const { baseBackend, xAccessKey, xMasterKey, meBinID } = config.public;
  const apiEndpoint = `${baseBackend}/b/${meBinID}?meta=false`;
  const store = useUserStore()
  if (process.server) {
    const { data, pending, error } = await useFetch<ActiveUser>(apiEndpoint, {
      headers: {
        ["X-Master-Key"]: xMasterKey,
        ["X-Access-Key"]: xAccessKey,
      },
    });
    if (error.value) {
        console.error(error)
        store.setUser(null)
    } else {
        store.setUser(data.value)
    }
  }
};
