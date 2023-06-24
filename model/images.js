import mongoose from "mongoose";

const { Schema } = mongoose;

const ImagesSchema = new Schema(
  {
    name: {
      type: String,
    },
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

const Images = mongoose.model("Images", ImagesSchema);

export default Images;
