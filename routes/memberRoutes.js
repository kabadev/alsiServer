import {
  createItem,
  deleteItem,
  getItem,
  getAllItems,
} from "../controller/memberController.js";
import { upload } from "../util/cloudinary.js";
export const memberRoutes = (router) => {
  router.post(
    "/api/member",
    upload.fields([
      { name: "img", maxCount: 1 },
      { name: "passport", maxCount: 1 },
      { name: "admissionLetter", maxCount: 1 },
      { name: "efro", maxCount: 1 },
    ]),
    createItem
  );
  router.delete("/api/member/:id", deleteItem);
  router.get("/api/member/:id", getItem);
  router.get("/api/member", getAllItems);
};
