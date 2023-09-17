import { ShortUser } from "~/types/global";

export const useUsersList = async (ids: string[]) => {
  const config = useRuntimeConfig();
  const { baseBackend, xAccessKey, xMasterKey, listBinID } = config.public;
  const apiEndpoint = `${baseBackend}/b/${listBinID}?meta=false `;
  const { data, pending, error } = await useFetch<ShortUser[]>(apiEndpoint, {
    headers: {
      ["X-Master-Key"]: xMasterKey,
      ["X-Access-Key"]: xAccessKey,
    },
  });
  return { data, pending, error };
};
