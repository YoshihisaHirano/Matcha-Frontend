import { CommonUserData } from "~/types/global";

export const useNewPictures = async (
  newPics: string[],
  oldPics: string[]
): Promise<Pick<CommonUserData, "mainImage" & "pictures">> => {
  const reqBody = sortImagesToHandle(newPics, oldPics);
  let newPictures = [...newPics];
  const { data } = await useFetch("/api/image", {
    method: "POST",
    body: JSON.stringify(reqBody),
  });
  if (data.value?.status === "ok" && data.value?.urls?.length) {
    newPictures = [...newPictures, ...data.value.urls];
  }
  newPictures = newPictures.filter((item) => !item.startsWith("data:"));
  if (data.value?.status === "ok" && data.value.mainImage) {
    newPictures[0] = data.value.mainImage;
  }
  return {
    mainImage: newPictures[0],
    pictures: newPictures.slice(1),
  };
};
