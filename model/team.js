import mongoose from "mongoose";

const { Schema } = mongoose;

const TeamSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "",
    },
    teamType: {
      type: String,
      default: "Executive",
    },
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    twitter: {
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

const Team = mongoose.model("Team", TeamSchema);

export default Team;
