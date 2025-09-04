import { v2 as Cloudinary } from "cloudinary";
import { envVars } from "./env";

Cloudinary.config({
  cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
  api_key: envVars.CLOUDINARY_API_KEY,
  api_secret: envVars.CLOUDINARY_API_SECRET,
});

export const cloudinaryUpload = Cloudinary;
