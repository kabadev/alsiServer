import {
  AuthenticatedUser,
  Login,
  Logout,
  Refresh,
  Register,
} from "../controller/authController.js";
import { upload, uploadImageToCloudinary } from "../util/cloudinary.js";
export const authRoutes = (router) => {
  router.post("/api/register", upload.single("file"), Register);
  router.post("/api/login", Login);
  router.get("/api/user", AuthenticatedUser);
  router.post("/api/refresh", Refresh);
  router.post("/api/logout", Logout);
};
