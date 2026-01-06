import { v2 as cloudinary } from "cloudinary";

export const initCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log("✅ Cloudinary initialized:", {
    name: process.env.CLOUDINARY_CLOUD_NAME,
    key: process.env.CLOUDINARY_API_KEY ? "LOADED" : "MISSING",
    secret: process.env.CLOUDINARY_API_SECRET ? "LOADED" : "MISSING",
  });

  return cloudinary;
};
