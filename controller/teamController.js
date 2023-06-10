import Team from "../model/team.js";
import { uploadImageToCloudinary, deleteImage } from "../util/cloudinary.js";
// create
export const createItem = async (req, res) => {
  try {
    const file = req.file.path;
    const img = await uploadImageToCloudinary(file);
    const newTeam = new Team({
      fullName: req.body.fullName,
      position: req.body.position,
      teamType: req.body.type,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      img: img,
    });

    const savedTeam = await newTeam.save();
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: savedTeam,
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
    const team = await Team.findById(req.params.id);
    if (!team)
      return res.status(404).json({
        message: "Team Member Not Found",
        success: false,
        statusCode: 404,
      });

    const data = {
      fullName: req.body.fullName,
      position: req.body.position,
      teamType: req.body.type,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
    };

    if (req.file) {
      const file = req.file.path;
      const img = await uploadImageToCloudinary(file);
      data.img = img;
      await deleteImage(team.img._id);
    }
    const updatedTeam = await Team.findByIdAndUpdate(
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
// delete
export const deleteItem = async (req, res) => {
  const teamList = await Team.find();
  try {
    const team = await Team.findById(req.params.id);
    if (!team)
      return res.status(404).json({
        message: "Team Member Not Found",
        success: false,
        statusCode: 404,
      });

    await Team.findByIdAndDelete(req.params.id);
    await deleteImage(team.img._id);
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
    const team = await Team.findById(req.params.id);
    if (!team)
      return res.status(404).json({
        message: "Team Not Found",
        success: false,
        statusCode: 404,
      });
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: team,
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
    const teams = await Team.find();
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
