import multer from "multer";
import path from "path";
// const path = require("path");

// Multer config
const storage = multer.diskStorage({
  filename(req, file, cb) {
    console.log(path.extname, file.originalname);
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`
    );
  },
});
export const upload = multer({
  storage,
  limits: {
    fileSize: 5e6,
  },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

// export const upload = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (
//       ext !== ".jpg" &&
//       ext !== ".jpeg" &&
//       ext !== ".png" &&
//       ext !== ".PNG" &&
//       ext !== ".gif"
//     ) {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });
