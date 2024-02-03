import { FullUser } from "~/types/global";

export function adaptUserForEdit(user: Partial<FullUser>) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    biography: user.biography,
    tagList: user.tags,
    location: user.location,
    dateOfBirth: user.dateOfBirth,
    mainImage: user.mainImage,
    pictures: user.pictures,
    sexPref: user.sexPref,
    gender: user.gender,
  };
}
