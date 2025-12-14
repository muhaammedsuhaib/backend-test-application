import { model, Schema } from "mongoose";
import { ITodo } from "./todo.types";

const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Todo = model<ITodo>("Todo", todoSchema);
export default Todo;
