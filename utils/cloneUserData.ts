import { CommonUserData } from "~/types/global";

export function cloneUserData(data: CommonUserData | null) {
  if (!data) return null;
  return {
    ...data,
    location: { ...data.location },
    tags: [...data.tags],
    pictures: [...data.pictures],
  };
}
