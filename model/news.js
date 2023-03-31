import mongoose from "mongoose";

const { Schema } = mongoose;

const NewsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    desc: {
      type: String,
      default: "",
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

const News = mongoose.model("News", NewsSchema);

export default News;
