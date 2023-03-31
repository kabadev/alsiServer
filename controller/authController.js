import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { upload, uploadImageToCloudinary } from "../util/cloudinary.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helper/generateToken.js";

export const Register = async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // const fileStr = req.file.buffer;

    // const img = await uploadImageToCloudinary(fileStr);

    //create new user
    const newUser = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
      // img: img,
      // imgId: img,
    });
    const oldemail = await User.findOne({ email: req.body.email });
    if (oldemail) {
      return res.status(400).json("Email Already Exist");
    } else {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Email is Incorrect");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong Password");

    // if (user && validPassword) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      // sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect("http://localhost:3001/events");
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json({
      ...others,
      accessToken: accessToken,
    });
    // }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const AuthenticatedUser = async (req, res) => {
  try {
    const accessToken = req.header("Authorization")?.split(" ")[1] || "";
    // const accessToken = req.cookies["accessToken"];

    const payload = jwt.verify(accessToken, process.env.TOKEN_SECRET);

    if (!payload) {
      return res.status(401).send({
        message: "You are not authenticated",
        success: false,
        statusCode: 401,
      });
    }

    const user = await User.findOne({ email: payload.email });

    if (!user) {
      return res.status(401).send({
        message: "You are not authenticated",
        success: false,
        statusCode: 401,
      });
    }

    const { password, ...data } = user._doc;

    res.status(200).send({
      message: "Sucess",
      success: true,
      statusCode: 200,
      data: data,
    });
  } catch (e) {
    return res.status(401).send({
      message: "Error " + e,
      success: false,
      statusCode: 401,
    });
  }
};

export const Refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies["refreshToken"];

    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (!payload) {
      return res.status(401).send({
        message: "You are not authenticated ",
        success: false,
        statusCode: 401,
      });
    }

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return res.status(401).send({
        message: "You are not authenticated ",
        success: false,
        statusCode: 401,
      });
    }
    const accessToken = generateAccessToken(user);
    res.send({
      message: "success",
      success: true,
      statusCode: 200,
      accessToken: accessToken,
    });
  } catch (e) {
    return res.status(500).send({
      message: "Error:" + e,
      success: false,
      statusCode: 500,
    });
  }
};

export const Logout = async (req, res) => {
  res.cookie("refreshToken", "", { maxAge: 0 });
  res.send({
    message: "success",
  });
};
