import Event from "../model/Event.js";
import slugify from "slugify";
import { deleteImage, uploadImageToCloudinary } from "../util/cloudinary.js";
// create
export const createItem = async (req, res) => {
  try {
    const files = req.files["files"];
    const featureImage = req.files["featureImage"][0].path;
    const fileStr = [];
    const imgs = [];

    await files.map((file) => {
      fileStr.push(file.path);
    });
    const img = await uploadImageToCloudinary(featureImage);
    const upload = await Promise.all(
      fileStr.map(function (file) {
        return uploadImageToCloudinary(file);
      })
    );

    upload.map((img) => {
      imgs.push({ url: img.url, id: img._id });
    });

    const newEvent = new Event({
      title: req.body.title,
      date: req.body.date,
      img: img,
      images: imgs,
      desc: req.body.desc,
      slug: slugify(req.body.title),
    });

    const savedEvent = await newEvent.save();
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: savedEvent,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error " + err, success: false, statusCode: 500 });
  }
};

// update
export const updateItem = async (req, res) => {
  try {
    const files = req.files["files"];
    const fileStr = [];
    const imgs = [];

    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({
        message: "Event Not Found",
        success: false,
        statusCode: 404,
      });

    const data = {
      title: req.body.title,
      desc: req.body.desc,
      slug: slugify(req.body.title),
    };

    if (req.files["files"]) {
      files.map((file) => {
        fileStr.push(file.path);
      });

      const upload = await Promise.all(
        fileStr.map(function (file) {
          return uploadImageToCloudinary(file);
        })
      );
      upload.map((img) => {
        imgs.push({ url: img.url, id: img._id });
      });
    }
    if (req.files["featureImage"]) {
      const featureImage = req.files["featureImage"][0].path;
      const img = await uploadImageToCloudinary(featureImage);
      data.img = img;
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $set: data,
        $push: { images: { $each: imgs } },
      },
      { new: true }
    );

    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: updatedEvent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error " + error, success: false, statusCode: 500 });
  }
};

export const deleteItemImage = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({
        message: "Event Not Found",
        success: false,
        statusCode: 404,
      });

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { images: { id: `alsi/${req.params.imgId}` } },
      },
      { new: true }
    );
    await deleteImage(`alsi/${req.params.imgId}`);
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: updatedEvent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error " + error, success: false, statusCode: 500 });
  }
};
// delete
export const deleteItem = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({
        message: "Event Not Found",
        success: false,
        statusCode: 404,
      });

    await Event.findByIdAndDelete(req.params.id);
    await deleteImage(event.img._id);
    event.images.map((image) => {
      deleteImage(image.id);
    });
    res.status(200).json({
      message: "successsss",
      success: true,
      statusCode: 200,
      data: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error " + error, success: false, statusCode: 500 });
  }
};

// get one item function
export const getItem = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({
        message: "Event Not Found",
        success: false,
        statusCode: 404,
      });
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: event,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error " + error, success: false, statusCode: 500 });
  }
};
// get Itemsfunction
export const getAllItems = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: events,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error " + err, success: false, statusCode: 500 });
  }
};
