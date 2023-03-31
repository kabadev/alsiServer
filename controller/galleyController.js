import Gallery from "../model/gallery.js";

import { uploadImageToCloudinary, deleteImage } from "../util/cloudinary.js";
// create
export const createItem = async (req, res) => {
  try {
    const files = req.files["files"];
    const fileStr = [];
    const imgs = [];

    await files.map((file) => {
      fileStr.push(file.path);
    });

    const upload = await Promise.all(
      fileStr.map(function (file) {
        return uploadImageToCloudinary(file);
      })
    );

    upload.map((img) => {
      imgs.push(img);
    });

    imgs.map(async function (img) {
      const newImage = new Gallery({
        img: img,
      });
      newImage.save();
    });
    const images = await Gallery.find();
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      message: "Somethings Went Wrong Please Try Again  ",
      error: error,
      success: false,
      statusCode: 500,
    });
  }
};

// delete
export const deleteItem = async (req, res) => {
  const images = await Gallery.find();
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image)
      return res.status(404).json({
        message: "Image Not Found",
        success: false,
        statusCode: 404,
      });

    await Gallery.findByIdAndDelete(req.params.id);
    await deleteImage(image.img._id);
    res.status(200).json({
      data: null,
      message: "success",
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Somethings Went Wrong Please Try Again  ",
      error: error,
      success: false,
      statusCode: 500,
    });
  }
};

// get Itemsfunction
export const getAllItems = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: images,
    });
  } catch (err) {
    res.status(500).json({
      message: "Somethings Went Wrong Please Try Again  ",
      error: err,
      success: false,
      statusCode: 500,
    });
  }
};
