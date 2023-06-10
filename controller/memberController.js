import Member from "../model/member.js";
import slugify from "slugify";
import { deleteImage, uploadImageToCloudinary } from "../util/cloudinary.js";
// create
export const createItem = async (req, res) => {
  try {
    const img = await uploadImageToCloudinary(req.files["img"][0].path);
    const passport = await uploadImageToCloudinary(
      req.files["passport"][0].path
    );
    const admissionLetter = await uploadImageToCloudinary(
      req.files["admissionLetter"][0].path
    );
    const efro = await uploadImageToCloudinary(
      req.files["admissionLetter"][0].path
    );

    const newMember = new Member({
      fullName: req.body.fullName,
      email: req.body.email,
      contact: req.body.contact,
      sex: req.body.sex,
      state: req.body.state,
      city: req.body.city,
      address: req.body.address,
      course: req.body.course,
      duration: req.body.duration,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      currentYear: req.body.currentYear,
      degreeType: req.body.degreeType,
      remarksEnquiry: req.body.remarksEnquiry,
      passport: passport,
      admissionLetter: admissionLetter,
      efro: efro,
      img: img,
    });
    const savedMember = await newMember.save();
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: savedMember,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "Somethings went wrong please try again ",
      success: false,
      statusCode: 500,
    });
  }
};
// delete
export const deleteItem = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member)
      return res.status(404).json({
        message: "Member Not Found",
        success: false,
        statusCode: 404,
      });

    await Member.findByIdAndDelete(req.params.id);
    await deleteImage(member.img._id);
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error " + err, success: false, statusCode: 500 });
  }
};
// get one item function
export const getItem = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member)
      return res.status(404).json({
        message: "Member Not Found",
        success: false,
        statusCode: 404,
      });
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: member,
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
    const members = await Member.find();
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: members,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error " + err, success: false, statusCode: 500 });
  }
};
