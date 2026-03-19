import mongoose from "mongoose";

export interface IUser {
  id: mongoose.Types.ObjectId
  name: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  image?: string;
  bio?: string;

  role: "USER" | "ADMIN";

  followers?: string[]; // userIds
  following?: string[]; // userIds

  posts?: string[]; // postIds
  savedPosts?: string[]; // saved postIds

  story?: string; // story image/video URL

  isVerified?: boolean;
  isBlocked?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
