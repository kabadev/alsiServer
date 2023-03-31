import {
  createItem,
  deleteItem,
  getAllItems,
} from "../controller/galleyController.js";
import { upload } from "../util/cloudinary.js";
export const galleryRoutes = (router) => {
  router.post("/api/gallery", upload.fields([{ name: "files" }]), createItem);
  router.delete("/api/gallery/:id", deleteItem);
  router.get("/api/gallery", getAllItems);
};
