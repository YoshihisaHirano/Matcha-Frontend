import { LocationSearchRes } from "~/types/global";

export const useLocationSearch = async (query: string) => {
  const config = useRuntimeConfig();
  const { rapidApiKey, geocodingHost } = config.public;
  const params = new URLSearchParams({
    q: query,
    limit: "5",
    "accept-language": "en",
    polygon_threshold: "0.0",
  });
  const url = `https://${geocodingHost}/v1/search?${params.toString()}`;
  const { data, error } = await useFetch<any[]>(url, {
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": geocodingHost,
    },
  });
  if (error.value) {
    return null;
  }
  const res: LocationSearchRes | null =
    data.value?.reduce((acc, curr) => {
      const coords = { lat: curr.lat, lon: curr.lon };
      acc[curr.display_name] = coords;
      return acc
    }, {} as LocationSearchRes) || null;
  return res;
};
