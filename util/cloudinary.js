import multer from "multer";
import cloudinary from "cloudinary";
import path from "path";
import dotenv from "dotenv";
import streamifier from "streamifier";
dotenv.config();
// configure Multer to store uploaded files in memory as Buffers
const storage = multer.diskStorage({});
export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".JPG" &&
      ext !== ".jpeg" &&
      ext !== ".JPEG" &&
      ext !== ".png" &&
      ext !== ".PNG"
    ) {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

// configure Cloudinary with your account details
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// define a function to upload an image to Cloudinary and return the URL and ID
export async function uploadImageToCloudinary(file) {
  // upload the image to Cloudinary
  // const stream = streamifier.createReadStream(file);
  const result = await cloudinary.v2.uploader.upload(file, {
    upload_preset: "alsi_upload",
  });

  // return the URL and ID of the uploaded image
  return {
    url: result.secure_url,
    _id: result.public_id,
  };
}
export const deleteImage = async (id) => {
  await cloudinary.v2.uploader.destroy(id);
};
// define a Multer middleware function to handle file uploads
