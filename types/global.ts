export interface LocationCoords {
  lat: string | number;
  lon: string | number;
}

export type SexPref = "women" | "men" | "both";
export type Gender = "female" | "male" | "other";

export interface UserCardInfo {
  dateOfBirth: number;
  firstName: string;
  id: string;
  gender: Gender;
  sexPref: SexPref;
  image: string;
  tags: string[];
  location: LocationCoords;
}
