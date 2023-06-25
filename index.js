import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// routes
import { authRoutes } from "./routes/authRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { eventRoutes } from "./routes/eventRoutes.js";
import { newsRoutes } from "./routes/newsRoutes.js";
import { teamRoutes } from "./routes/teamRoutes.js";
import { memberRoutes } from "./routes/memberRoutes.js";
import { galleryRoutes } from "./routes/galleryRoutes.js";
import { imagesRoutes } from "./routes/imagesRoutes.js";
const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connected"))
  .catch((error) => console.log(error));

app.use(
  cors({
    origin: [
      process.env.ClIENT_URL,
      "https://alsiadmin.alsi22.com",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
  })
);
//midddlewares
app.use(express.json());
app.use(cookieParser());
authRoutes(app);
userRoutes(app);
eventRoutes(app);
newsRoutes(app);
teamRoutes(app);
memberRoutes(app);
galleryRoutes(app);
imagesRoutes(app);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server listening on port " + process.env.PORT);
});
