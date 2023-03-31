import mongoose from "mongoose";

const { Schema } = mongoose;

const MemberSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      default: "",
    },
    institute: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    course: {
      type: String,
      default: "",
    },
    duration: {
      type: Date,
      default: null,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    currentYear: {
      type: String,
      default: null,
    },
    degreeType: {
      type: String,
      default: "",
    },

    remarksEnquiry: {
      type: String,
      default: "",
    },
    img: {
      type: {
        url: String,
        _id: String,
      },
    },

    passport: {
      type: {
        url: String,
        _id: String,
      },
    },
    admissionLetter: {
      type: {
        url: String,
        _id: String,
      },
      default: "",
    },
    efro: {
      type: {
        url: String,
        _id: String,
      },
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", MemberSchema);

export default Member;
