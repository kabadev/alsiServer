import Images from "../model/images.js";
import { uploadImageToCloudinary, deleteImage } from "../util/cloudinary.js";

// update
export const updateItem = async (req, res) => {
  try {
    const team = await Images.findById(req.params.id);
    if (!team)
      return res.status(404).json({
        message: "Team Member Not Found",
        success: false,
        statusCode: 404,
      });

    const data = {
      body: "null",
    };

    if (req.file) {
      const file = req.file.path;
      const img = await uploadImageToCloudinary(file);
      data.img = img;
      //   await deleteImage(team.img._id);
    }
    const updatedTeam = await Images.findByIdAndUpdate(
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
      data: updatedTeam,
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
    const teams = await Images.find();
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: teams,
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
