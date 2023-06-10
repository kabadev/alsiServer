import User from "../model/User.js";
import Team from "../model/team.js";
import News from "../model/news.js";
import Member from "../model/member.js";
import Gallery from "../model/gallery.js";
import Event from "../model/event.js";

import bcrypt from "bcrypt";
import { query } from "express";

//create new user/ partner function
export const create = async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      mobile: req.body.mobile,
      role: req.body.role,
      country: req.body.country,
      avatar: req.body.avatar,
      joinDate: req.body.joinDate,
      password: hashedPassword,
    });

    // check if email already exist
    const existEmail = await User.findOne({ email: req.body.email });
    if (existEmail) {
      return res.status(400).json({
        message: "Email Already Exist",
        success: false,
        statusCode: 400,
      });
    } else {
      await newUser.save();
      res.status(200).json({
        message: "User created successfully",
        success: true,
        statusCode: 200,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something Went Wrong ",
      error: err,
      success: false,
      statusCode: 500,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Email is incorrect",
        success: false,
        statusCode: 400,
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Wrong Password", success: false, statusCode: 400 });
    }

    // if user && validPassword create token
    // ........
    // ........

    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json({
      ...others,
    });

    // }
  } catch (err) {
    res.status(500).json({
      message: "Somethings Went Wrong",
      error: err,
      success: false,
      statusCode: 500,
    });
  }
};

// get one n
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const { password, ...userData } = user._doc;
      res.status(200).json({
        message: "success",
        success: true,
        statusCode: 200,
        data: userData,
      });
    } else {
      res
        .status(404)
        .json({ message: "User Not Found", success: false, statusCode: 404 });
    }
  } catch (err) {
    res.status(500).json({
      message: "Somethings Went Wrong Please",
      error: err,
      success: false,
      statusCode: 500,
    });
  }
};
// getALluser
export const getAllUser = async (req, res) => {
  try {
    const roles = req.query.role?.split(",") || [];
    const query = roles.length > 0 ? { role: { $in: roles } } : {};
    const users = await User.find(query);
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something Went Wrong",
      error: err.message,
      success: false,
      statusCode: 500,
    });
  }
};

export const updatePasword = async (req, res) => {
  const password = req.body.password;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { password: hashedPassword },
      },
      { new: true }
    );
    res.status(200).json("Updated Successfully");
  } else {
    res.status(400).json("no password");
  }
};
// update user

// delete user

export const getAllTotal = async (req, res) => {
  const Parliament = await Team.countDocuments({ teamType: "Parliament" });
  const Executive = await Team.countDocuments({ teamType: "Executive" });
  const event = await Event.countDocuments();
  const news = await News.countDocuments();
  const member = await Member.countDocuments();
  const Images = await Member.countDocuments();
  res.status(200).json({
    Parliament: Parliament,
    Executive: Executive,
    event: event,
    news: news,
    member: member,
    Images: Images,
  });
};
