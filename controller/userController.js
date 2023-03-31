import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helper/generateToken.js";

// get one user function
export const getOne = async (req, res) => {
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
      message: "catch Error" + err,
      success: false,
      statusCode: 500,
    });
  }
};

// getALluser function
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "success",
      success: true,
      statusCode: 200,
      data: users,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
