import { UserCardInfo, Filters } from "~/types/global";

function dataAdatpter(data: any[]): UserCardInfo[] {
    return data.map((item) => ({
        dateOfBirth: Number(item.dateOfBirth),
        firstName: item.firstName,
        gender: item.gender?.toLowerCase(),
        id: item.id,
        sexPref: item.sexPref?.toLowerCase(),
        image: item.image,
        tags: item.tags || [],
        location: { lat: item.latitude, lon: item.longitude }
    }))
}

export const useSearch = async (
  id: string,
  filter: Filters = { pageNo: 1, limit: 10 }
) => {
  const config = useRuntimeConfig();
  const { baseBackend, xAccessKey, xMasterKey, searchBinID } = config.public;
  const apiEndpoint = `${baseBackend}/b/${searchBinID}?meta=false `;
  // return { data: null, pending: true, error: ''}
  const { data, pending, error } = await useFetch<any[]>(apiEndpoint, {
    headers: {
      ["X-Master-Key"]: xMasterKey,
      ["X-Access-Key"]: xAccessKey,
    },
  });
  let processedData = ref<UserCardInfo[]>([])
  if (data && data.value?.length) {
    processedData.value = dataAdatpter(data.value)
  }
  return { data: processedData, pending, error };
};
