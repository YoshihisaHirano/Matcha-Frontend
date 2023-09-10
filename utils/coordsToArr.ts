import { LocationCoords } from "~/types/global";

export function coordsToArr(coords: LocationCoords) {
  return [Number(coords.lon), Number(coords.lat)];
}
