import { Request, Response } from "express";
import Todo from "./todo.model";

/**
 * @desc   Get all active & not deleted todos
 * @route  GET /api/todos
 */
export const getTodos: any = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({
      is_deleted: false,
    }).sort({ created_at: -1 });

    res.status(200).json(todos);
  } catch (error) {
    console.log("Get Todos Error:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

/**
 * @desc   Create new todo
 * @route  POST /api/todos
 */
export const createTodo: any = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = await Todo.create({ title });

    res.status(201).json(todo);
  } catch (error) {
    console.log("Create Todo Error:", error);
    res.status(500).json({ message: "Failed to create todo" });
  }
};

/**
 * @desc   Update todo (toggle is_active)
 * @route  PATCH /api/todos/:id
 */
export const updateTodo: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const todo = await Todo.findByIdAndUpdate(id, { is_active }, { new: true });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.log("Update Todo Error:", error);
    res.status(500).json({ message: "Failed to update todo" });
  }
};

/**
 * @desc   Soft delete todo
 * @route  DELETE /api/todos/:id
 */
export const deleteTodo: any = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log("Delete Todo Error:", error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
};
