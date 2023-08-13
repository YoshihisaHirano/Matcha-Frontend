export function kebabCase(inputString: string) {
  return inputString
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}
