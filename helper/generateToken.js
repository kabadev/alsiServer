import jwt from "jsonwebtoken";
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1w",
    }
  );
};
