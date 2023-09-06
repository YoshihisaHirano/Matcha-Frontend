import { EditableUserData } from "~/types/global";

export function cloneEditableData(data: EditableUserData | null) {
  if (!data) return null;
  return {
    ...data,
    location: { ...data.location },
  };
}
