import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default defineEventHandler(async (event) => {
  const { mainImage, toUpload, toDelete } = await readBody(event);
  const uploadPromises: Promise<any>[] = [];
  const destroyPromises: Promise<any>[] = [];
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
    // console.log(uploadRes, destroyRes);
    let mainImageUpload: UploadApiResponse | null = null;
    if (mainImage.startsWith("data:")) {
      mainImageUpload = await cloudinary.uploader.upload(mainImage, {
          quality: 80,
        })
    }
    return {
      status: "ok",
      urls: uploadRes.map((item) => item.secure_url).filter((item) => item),
      mainImage: mainImageUpload?.secure_url || null
    };
  } catch (error) {
    console.error(error);
    return { status: "fail", urls: null, mainImage: null };
  }
});
