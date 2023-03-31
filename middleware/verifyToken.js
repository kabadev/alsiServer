import jwt from "jsonwebtoken";
import User from "../model/User.js";
// import asyncHandler from "express-async-handler";

export const verifyToken = async (req, res, next) => {
  // const accessToken = req.cookies["accessToken"];
  const accessToken = req.header("Authorization")?.split(" ")[1] || "";
  if (accessToken) {
    jwt.verify(
      accessToken,
      process.env.TOKEN_SECRET,
      asyncHandler(async (err, user) => {
        if (err)
          res.status(401).json({
            message: "Token is not valid!",
            success: false,
            statusCode: 401,
          });

        const foundUser = await User.findOne({ email: user.email });
        if (!foundUser) {
          return res.status(401).send({
            message: "You are not authenticated",
            success: false,
            statusCode: 401,
          });
        }
        req.user = user;
        next();
      })
    );
  } else {
    return res
      .status(401)
      .json({ message: "You are not authenticated", success: false });
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        message: "You are not allowed to do that!",
        success: false,
        statusCode: 401,
      });
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        message: "You are not allowed to do that!",
        success: false,
        statusCode: 403,
      });
    }
  });
};
