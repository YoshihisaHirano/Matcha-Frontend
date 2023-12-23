import IPGeolocationAPI from "ip-geolocation-api-javascript-sdk";
import { LocationCoords } from "../../types/global";

function getGeolocation() {
  return new Promise<{ status: string; coords: LocationCoords }>(
    (resolve, reject) => {
      let ipgeolocationApi = new IPGeolocationAPI(
        process.env.IP_GEOLOCATION_API_KEY,
        false
      );
      ipgeolocationApi.getGeolocation((res: any) => {
        const { latitude, longitude } = res;
        if (!latitude || !longitude) {
          reject({ status: "fail", coords: null });
        }
        resolve({ status: "ok", coords: { lat: latitude, lon: longitude } });
      });
    }
  );
}

export default defineEventHandler(async (event) => {
  try {
    const res = await getGeolocation();
    return res;
  } catch (error) {
    console.error("ROUTE ERROR", error);
    return { status: "fail", coords: null };
  }
});
