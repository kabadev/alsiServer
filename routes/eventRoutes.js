import {
  createItem,
  updateItem,
  deleteItemImage,
  deleteItem,
  getItem,
  getAllItems,
} from "../controller/eventController.js";
import { upload } from "../util/cloudinary.js";
export const eventRoutes = (router) => {
  router.post(
    "/api/events",
    upload.fields([{ name: "files" }, { name: "featureImage", maxCount: 1 }]),
    createItem
  );
  router.put(
    "/api/events/:id",
    upload.fields([{ name: "files" }, { name: "featureImage", maxCount: 1 }]),
    updateItem
  );
  router.put("/api/events/:id/:imgId", deleteItemImage);
  router.delete("/api/events/:id", deleteItem);
  router.get("/api/events/:id", getItem);
  router.get("/api/events", getAllItems);
};
