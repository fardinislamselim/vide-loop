import { Types } from "mongoose";

export interface IPost {
  author: Types.ObjectId;

  content: string;
  image?: string;

  likes: Types.ObjectId[];
  commentsCount: number;

  isDeleted: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
