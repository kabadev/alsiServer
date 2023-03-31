// upload files
const router = require("express").Router();
var multer = require("multer");

var imageArray = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    var filname = Date.now() + "-" + file.originalname.toLowerCase();
    imageArray.push(filname);
    cb(null, filname);
  },
});
const upload = multer({ storage: storage });
var uploadMultiple = upload.array("files");

router.post("/", uploadMultiple, (req, res) => {
  try {
    res.status(200).json({ img: imageArray });
    imageArray = [];
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
