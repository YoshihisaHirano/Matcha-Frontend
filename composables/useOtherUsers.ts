import { CommonUserData } from "~/types/global";

export const useOtherUsers = async (id: string) => {
  const config = useRuntimeConfig();
  const { baseBackend, xAccessKey, xMasterKey, profileBinID } = config.public;
  const apiEndpoint = `${baseBackend}/b/${profileBinID}?meta=false`;
  const { data, pending, error } = await useFetch<CommonUserData>(apiEndpoint, {
    headers: {
      ["X-Master-Key"]: xMasterKey,
      ["X-Access-Key"]: xAccessKey,
    },
  });
  if (error.value) return null;
  return data.value || null;
};
