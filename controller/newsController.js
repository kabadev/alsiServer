import News from "../model/news.js";
import slugify from "slugify";
import { uploadImageToCloudinary, deleteImage } from "../util/cloudinary.js";
// create
export const createItem = async (req, res) => {
  const file = req.file.path;
  try {
    const img = await uploadImageToCloudinary(file);
    const newNews = new News({
      title: req.body.title,
      img: img,
      desc: req.body.desc,
      slug: slugify(req.body.title),
    });

    const savedUser = await newNews.save();
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: savedUser,
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

// update
export const updateItem = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news)
      return res.status(404).json({
        message: "News Not Found",
        success: false,
        statusCode: 404,
      });

    const data = {
      title: req.body.title,
      desc: req.body.desc,
      slug: slugify(req.body.title),
    };

    if (req.file) {
      const file = req.file.path;
      const img = await uploadImageToCloudinary(file);
      data.img = img;
      await deleteImage(news.img._id);
    }
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      {
        $set: data,
      },
      { new: true }
    );
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: updatedNews,
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
  const newsList = await News.find();
  try {
    const news = await News.findById(req.params.id);
    if (!news)
      return res.status(404).json({
        message: "News Not Found",
        success: false,
        statusCode: 404,
      });

    await News.findByIdAndDelete(req.params.id);
    await deleteImage(news.img._id);
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

// get one item function
export const getItem = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news)
      return res.status(404).json({
        message: "News Not Found",
        success: false,
        statusCode: 404,
      });
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: news,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error " + err, success: false, statusCode: 500 });
  }
};
// get Itemsfunction
export const getAllItems = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: news,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error " + err, success: false, statusCode: 500 });
  }
};
