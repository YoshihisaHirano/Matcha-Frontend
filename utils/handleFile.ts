const MAX_FILE_SIZE_MB = 2;

function readAsDataURLAsync(file: File): Promise<FileReader["result"]> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      // Resolve with the Data URL when successfully loaded
      resolve(event.target?.result || null);
    };

    reader.onerror = () => {
      // Resolve with null when an error occurs
      resolve(null);
    };

    // Start reading the file as a Data URL
    reader.readAsDataURL(file);
  });
}

export async function handleFile(file: File, acceptedTypes?: string[]) {
  if (
    (acceptedTypes && !acceptedTypes.includes(file.type)) ||
    file.size > MAX_FILE_SIZE_MB * 1024 * 1024
  ) {
    return null;
  }
  try {
      const res = await readAsDataURLAsync(file);
      return res;
  } catch (error) {
    console.error(error);
    return null;
  }
  return null;
}
