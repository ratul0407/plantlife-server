import multer from "multer";
import { cloudinaryUpload } from "./cloudinary.config";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {
      const fileName = file.originalname
        .toLowerCase()
        .replace(/\s+g/, "-")
        .replace(/\.g/, "-")
        .replace(/[^a-z0-9\-.]/g, "");
      const uniqueFileName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileName;
      return uniqueFileName;
    },
  },
});

export const multerUpload = multer({ storage: storage });
