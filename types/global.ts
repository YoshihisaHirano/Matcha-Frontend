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

export interface Filters {
  ageFrom?: number;
  ageTo?: number;
  fameFrom?: number;
  fameTo?: number;
  location?: LocationCoords;
  locationRadius?: number;
  tags?: string[];
  pageNo: number;
  limit: number;
}

export interface BaseUser {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  gender: Gender
  sexPref: SexPref
  biography: string
  tags: string[]
}