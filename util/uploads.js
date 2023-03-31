// upload files
const router = require("express").Router();
const { cloudinary } = require("../utils/cloudinary");
const upload = require("../utils/multer");

router.post("/", upload.array("files"), async (req, res) => {
  const files = req.files;
  const fileStr = [];
  const imgs = [];
  const imgId = [];

  files.map((file) => {
    fileStr.push(file.path);
  });

  const upload = await Promise.all(
    fileStr.map(function (file) {
      return cloudinary.uploader.upload(file, {
        upload_preset: "social_upload",
      });
    })
  );

  upload.map((img) => {
    imgs.push(img.secure_url);
    imgId.push(img.public_id);
  });

  res.status(200).json({ img: imgs, imgId: imgId });
});

module.exports = router;
