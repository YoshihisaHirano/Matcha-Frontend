export const useTagSearch = async (query: string) => {
  const config = useRuntimeConfig();
  const { binBaseBackend, xAccessKey, xMasterKey, tagBinID } = config.public;
  const apiEndpoint = `${binBaseBackend}/b/${tagBinID}?meta=false`;
  const { data, pending, error } = await useFetch<{ tags: string[] }>(
    apiEndpoint,
    {
      headers: {
        ["X-Master-Key"]: xMasterKey,
        ["X-Access-Key"]: xAccessKey,
      },
    }
  );

  return { data: data?.value?.tags || [], error };
};

export const useAddTag = async (tag: string) => {
  const config = useRuntimeConfig();
  const { binBaseBackend, xAccessKey, xMasterKey, tagBinID } = config.public;
  const apiEndpoint = `${binBaseBackend}/b/${tagBinID}?meta=false`;
  const { data: tags, error: getError } = await useFetch<{ tags: string[] }>(
    apiEndpoint,
    {
      headers: {
        ["X-Master-Key"]: xMasterKey,
        ["X-Access-Key"]: xAccessKey,
      },
    }
  );
  if (!tags.value) return { data: null, error: getError };
  const { data, pending, error } = await useFetch<{ record: any }>(
    apiEndpoint,
    {
      method: "PUT",
      headers: {
        ["X-Master-Key"]: xMasterKey,
        ["X-Access-Key"]: xAccessKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags: [...tags.value.tags, tag] }),
    }
  );
  if (error.value) console.error(error);
  return { data: data.value?.record || null, error };
};
