export function getImgPublicId(url: string) {
  const lastPart = url.split("/").pop();
  if (!lastPart) return null;
  const splitByDot = lastPart?.split(".");
  splitByDot.pop();
  return splitByDot.join(".");
}
