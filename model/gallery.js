import mongoose from "mongoose";

const { Schema } = mongoose;

const GallerySchema = new Schema(
  {
    img: {
      type: {
        url: String,
        _id: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", GallerySchema);

export default Gallery;
