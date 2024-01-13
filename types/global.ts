export interface LocationCoords {
  lat: string | number;
  lon: string | number;
}

export interface LocationSearchRes {
  [key: string]: LocationCoords;
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
  mainImage: string;
  tags: string[];
  location: LocationCoords;
  distance?: number;
  fameRating: number;
}

export interface Filters {
  ageFrom?: number;
  ageTo?: number;
  fameFrom?: number;
  fameTo?: number;
  location?: number[];
  locationRadius?: number;
  tags?: string[];
  pageNo: number;
  limit: number;
}

export interface PrivateUserData {
  email: string;
  emailVerified: boolean;
  username: string;
}

export interface CommonUserData {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  sexPref: SexPref;
  biography: string;
  tags: string[];
  location: LocationCoords;
  dateOfBirth: number;
  mainImage: string;
  pictures: string[];
  fameRating: number;
  online: boolean;
  lastSeen: number;
}

export interface UserInteractions {
  liked: string[];
  likedMe: string[];
  viewed: string[];
  viewedMe: string[];
  blocked: string[];
}

export type ActiveUser = PrivateUserData & CommonUserData;
export type FullUser = PrivateUserData & CommonUserData & UserInteractions;

export type SignupUserData = Pick<
  ActiveUser,
  "email" | "firstName" | "lastName" | "username"
> & { password: string };

export type ExtendedSignupUserData = Pick<
  CommonUserData,
  | "biography"
  | "mainImage"
  | "dateOfBirth"
  | "gender"
  | "sexPref"
  | "location"
  | "pictures"
  | "tags"
>;

export type EditableUserData = Pick<
  ActiveUser,
  | "biography"
  | "firstName"
  | "lastName"
  | "dateOfBirth"
  | "location"
  | "gender"
  | "sexPref"
>;

export type ShortUser = Pick<
  CommonUserData,
  "id" | "firstName" | "lastName" | "mainImage" | "online" | "lastSeen"
>;

export interface Message {
  id: string;
  chatId: string;
  authorId: string;
  text: string;
}

export interface Chat {
  id: string;
  user: ShortUser;
  messages: Message[];
  pageNo: number;
}

export interface Notification {
  id: string;
  type: "like" | "view" | "message" | "match" | "unlike";
  date: number;
  user: ShortUser;
  isRead: boolean;
}
