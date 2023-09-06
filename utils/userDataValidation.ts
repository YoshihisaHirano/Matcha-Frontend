import { CommonUserData, EditableUserData, SignupUserData } from "~/types/global";

export function isProfileDataValid(data: Partial<CommonUserData> | null) {
  if (!data) return false;
  return !!(
    data.biography &&
    data.dateOfBirth &&
    data.firstName &&
    data.lastName &&
    data.gender &&
    data.sexPref &&
    data.tags?.length &&
    data.mainImage
  );
}

export function isRegistrationDataValid(data: SignupUserData | null) {
  if (!data) return false;
  return !!(
    data.password &&
    data.firstName &&
    data.lastName &&
    data.username &&
    data.email
  );
}

export function isEditedDataValid(
  data: Pick<CommonUserData, "biography" | "firstName" | "lastName"> | null
) {
  if (!data) return false;
  return !!(data.firstName && data.lastName && data.biography && data.biography.length < 301);
}

export function hasUserDataChanged(
  newData: EditableUserData | null,
  oldData: EditableUserData | null
) {
  if (newData && !oldData) return false;
  if (oldData && !newData) return false;
  if (!oldData && !newData) return true;
  if (!newData) return false; // typeguard
  if (!oldData) return false; // typeguard
  return (
    newData.firstName !== oldData.firstName ||
    newData.lastName !== oldData.lastName ||
    newData.dateOfBirth !== oldData.dateOfBirth ||
    newData.biography !== oldData.biography ||
    newData.gender !== oldData.gender ||
    newData.sexPref !== oldData.sexPref ||
    newData.location.lat !== oldData.location.lat ||
    newData.location.lon !== oldData.location.lon
  );
}
