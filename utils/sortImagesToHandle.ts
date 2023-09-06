export function sortImagesToHandle(newImgs: string[], oldImgs: string[]) {
  const sortedImages = {
    mainImage: newImgs[0],
    toDelete: [] as string[],
    toUpload: [] as string[],
  };
  const arrayToInspect = Array.from(new Set([...newImgs, ...oldImgs])).filter(
    (item) => item !== sortedImages.mainImage
  );
  for (let img of arrayToInspect) {
    if (img.startsWith("data:")) {
      sortedImages.toUpload.push(img);
    }
    if (oldImgs.includes(img) && !newImgs.includes(img)) {
      const imgId = getImgPublicId(img);
      if (imgId) {
        sortedImages.toDelete.push(imgId);
      }
    }
  }
  return sortedImages;
}
