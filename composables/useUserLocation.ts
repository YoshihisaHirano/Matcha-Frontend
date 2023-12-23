import { useUserStore } from "~/stores/userStore";
import { LocationCoords } from "~/types/global";

export const useUserLocation = () => {
  let coords: LocationCoords | null = null;
  if (!process.client) return coords;
  const store = useUserStore();

  function setCoordsToStore(coords: LocationCoords) {
    store.setLocation(coords);
  }

  function onGeolocationSuccess(pos: GeolocationPosition) {
    const { latitude, longitude } = pos.coords;
    coords = { lat: latitude, lon: longitude };
    setCoordsToStore(coords);
    console.log("NAVIGATOR API - SUCCESS ", coords);
  }

  function onGeolocationError(err: GeolocationPositionError) {
    console.log("NAVIGATOR API - FAIL ", err);
    useFetch("/api/ipgeolocation")
      .then(({ data }) => {
        if (data.value?.status === "ok" && data.value?.coords) {
          coords = data.value.coords;
          console.log("IPGEOLOCATION API - SUCCESS ", coords);
          setCoordsToStore(coords);
        } else {
          console.log("IPGEOLOCATION API - FAIL ", data.value);
        }
      })
      .catch((err) => {
        console.log("IPGEOLOCATION API - FAIL ", err);
      });
  }

  navigator.geolocation.getCurrentPosition(
    onGeolocationSuccess,
    onGeolocationError,
    {
      enableHighAccuracy: true,
    }
  );

  return coords;
};
