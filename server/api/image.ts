import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default defineEventHandler(async (event) => {
  const { mainImage, toUpload, toDelete } = await readBody(event);
  const uploadPromises: Promise<any>[] = [];
  const destroyPromises: Promise<any>[] = [];
  if (mainImage.startsWith("data:")) {
    uploadPromises.push(
      cloudinary.uploader.upload(mainImage, {
        quality: 80,
      })
    );
  }
  for (const img of toUpload) {
    uploadPromises.push(
      cloudinary.uploader.upload(img, {
        quality: 80,
      })
    );
  }
  for (const img of toDelete) {
    destroyPromises.push(cloudinary.uploader.destroy(img));
  }
  try {
    const uploadRes = await Promise.all(uploadPromises);
    const destroyRes = await Promise.all(destroyPromises);
    console.log(uploadRes, destroyRes);
    return { status: "ok" };
  } catch (error) {
    return { status: "fail" };
  }
});
