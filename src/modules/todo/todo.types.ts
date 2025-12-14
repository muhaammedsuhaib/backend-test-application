import mongoose, { Document } from "mongoose";
export interface ITodo extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  is_deleted: boolean;
}
