import { getAllItems, updateItem } from "../controller/imagesController.js";
import { upload } from "../util/cloudinary.js";
export const imagesRoutes = (router) => {
  router.put("/api/images/:id", upload.single("file"), updateItem);
  router.get("/api/images", getAllItems);
};
