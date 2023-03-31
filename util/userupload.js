// upload files
// const router = require("express").Router();
import express from "express";
const router = express.Router();
import { upload } from "./multer.js";
import cloudinary from "cloudinary";

export const uploads = router.post(
  "/api/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const fileStr = req.file.path;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "alsi_upload",
      });
      res.json({
        url: uploadResponse.secure_url,
        imageId: uploadResponse.public_id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Something went wrong" });
    }
  }
);

// module.exports = router;
