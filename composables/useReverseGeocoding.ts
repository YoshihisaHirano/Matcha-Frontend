import { LocationCoords } from "~/types/global";

export const useReverseGeocoding = async (location: LocationCoords) => {
  const config = useRuntimeConfig();
  const { rapidApiKey, geocodingHost } = config.public;
  const params = new URLSearchParams({
    lat: location.lat.toString(),
    lon: location.lon.toString(),
    "accept-language": "en",
    polygon_threshold: "0.0",
  });
  const url = `https://${geocodingHost}/v1/reverse?${params.toString()}`;
  const { data, error, refresh } = await useFetch<any>(
    url,
    {
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": geocodingHost,
      },
      key: JSON.stringify(location),
    },
  );
  const addressRaw = data.value?.address;
  const address = addressRaw
    ? `${
        addressRaw?.city ||
        addressRaw?.town ||
        addressRaw?.state ||
        addressRaw?.county
      }, ${addressRaw?.country}`
    : "";
  return { address, error, refresh };
};
