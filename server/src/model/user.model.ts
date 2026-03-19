import { Schema, model } from "mongoose";
import { IUser } from "../types/user.interface";

// User Schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    image: {
      type: String,
      default: "https://i.ibb.co/B5X1Kmgt/download.jpg",
    },

    bio: {
      type: String,
      maxlength: 200,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    // savedPosts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Post",
    //   },
    // ],

    story: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// User Model
export const User = model<IUser>("User", userSchema);
export default User;
