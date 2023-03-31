import mongoose from "mongoose";

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    images: {
      type: Array,
      default: [],
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

const Event = mongoose.model("Event", EventSchema);

export default Event;
