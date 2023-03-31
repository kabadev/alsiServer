import {
  createItem,
  updateItem,
  deleteItem,
  getItem,
  getAllItems,
} from "../controller/teamController.js";
import { upload } from "../util/cloudinary.js";
export const teamRoutes = (router) => {
  router.post("/api/team", upload.single("file"), createItem);
  router.put("/api/team/:id", upload.single("file"), updateItem);
  router.delete("/api/team/:id", deleteItem);
  router.get("/api/team/:id", getItem);
  router.get("/api/team", getAllItems);
};
