export interface LocationCoords {
  lat: string | number;
  lon: string | number;
}

export interface OptionType {
  label: string;
  value: string;
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
  address: string;
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

export interface PrivateUserData {
  email: string
  emailVerified: boolean
  username: string
}

export interface CommonUserData {
  id: string
  firstName: string
  lastName: string
  gender: Gender
  sexPref: SexPref
  biography: string
  tags: string[]
  location: LocationCoords
  dateOfBirth: number
  mainImage: string
  pictures: string[]
  fameRating: number
  online: boolean
  lastSeen: number
}

export type ActiveUser = PrivateUserData & CommonUserData