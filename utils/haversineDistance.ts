/* this function is used to find distance between two sets of coords */

import { LocationCoords } from "~/types/global";

export function haversineDistance(coords1: LocationCoords, coords2: LocationCoords) {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    // Convert latitude and longitude from degrees to radians
    const radLat1 = toRadians(Number(coords1.lat));
    const radLon1 = toRadians(Number(coords1.lon));
    const radLat2 = toRadians(Number(coords2.lat));
    const radLon2 = toRadians(Number(coords2.lon));

    const earthRadius = 6371; // in kilometers

    // Haversine formula
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(radLat1) * Math.cos(radLat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return Math.round(distance);
}