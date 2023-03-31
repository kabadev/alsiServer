import { getOne, getAllUser } from "../controller/userController.js";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/verifyToken.js";

export const userRoutes = (router) => {
  router.get("/api/users/:id", verifyToken, getOne);
  router.get("/api/users", verifyTokenAndAdmin, getAllUser);
};
