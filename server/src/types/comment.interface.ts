import { Types } from "mongoose";

export interface IComment {
  user: Types.ObjectId;
  post: Types.ObjectId;

  comment: string;

  parentComment?: Types.ObjectId; 

  likes: Types.ObjectId[];

  isEdited: boolean;
  isDeleted: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
