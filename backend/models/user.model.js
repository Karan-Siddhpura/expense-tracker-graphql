import mongoose from "mongoose";

const username = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    geneder: {
      type: String,
      enum: ["male", "female"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", username);

export default User;
