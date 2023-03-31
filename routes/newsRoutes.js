import {
  createItem,
  updateItem,
  deleteItem,
  getItem,
  getAllItems,
} from "../controller/newsController.js";
import { upload } from "../util/cloudinary.js";
export const newsRoutes = (router) => {
  router.post("/api/news", upload.single("file"), createItem);
  router.put("/api/news/:id", upload.single("file"), updateItem);
  router.delete("/api/news/:id", deleteItem);
  router.get("/api/news/:id", getItem);
  router.get("/api/news", getAllItems);
};
