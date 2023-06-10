import {
  create,
  Login,
  getUser,
  getAllUser,
  updatePasword,
  getAllTotal,
} from "../controller/userController.js";

export const userRoutes = (router) => {
  // router.post("/api/users", create);
  router.post("/api/users/login", Login);
  router.put("/api/users/updatePassword/:id", updatePasword);
  // router.get("/api/users/:id", getUser);
  // router.get("/api/users", getAllUser);
  router.get("/api/total", getAllTotal);
};
