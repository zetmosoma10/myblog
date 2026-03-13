import cloudinary from "./cloudinaryConfigs.server";

const uploadImage = async (imageBase64?: string, folder?: string) => {
  let coverImage: string | undefined;
  let coverImagePublicId: string | undefined;

  // * Upload image to cloudinary if exist
  if (imageBase64) {
    const results = await cloudinary.uploader.upload(imageBase64, {
      folder,
      transformation: [
        { width: 1200, height: 630, crop: "fill" }, // * Consistent cover size
      ],
    });

    coverImage = results.secure_url;
    coverImagePublicId = results.public_id;
  }

  return { coverImage, coverImagePublicId };
};

export default uploadImage;
