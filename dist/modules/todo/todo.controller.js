"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todo_model_1 = __importDefault(require("./todo.model"));
/**
 * @desc   Get all active & not deleted todos
 * @route  GET /api/todos
 */
const getTodos = async (req, res) => {
    try {
        const todos = await todo_model_1.default.find({
            is_deleted: false,
        }).sort({ created_at: -1 });
        res.status(200).json(todos);
    }
    catch (error) {
        console.log("Get Todos Error:", error);
        res.status(500).json({ message: "Failed to fetch todos" });
    }
};
exports.getTodos = getTodos;
/**
 * @desc   Create new todo
 * @route  POST /api/todos
 */
const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const todo = await todo_model_1.default.create({ title });
        res.status(201).json(todo);
    }
    catch (error) {
        console.log("Create Todo Error:", error);
        res.status(500).json({ message: "Failed to create todo" });
    }
};
exports.createTodo = createTodo;
/**
 * @desc   Update todo (toggle is_active)
 * @route  PATCH /api/todos/:id
 */
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_active } = req.body;
        const todo = await todo_model_1.default.findByIdAndUpdate(id, { is_active }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json(todo);
    }
    catch (error) {
        console.log("Update Todo Error:", error);
        res.status(500).json({ message: "Failed to update todo" });
    }
};
exports.updateTodo = updateTodo;
/**
 * @desc   Soft delete todo
 * @route  DELETE /api/todos/:id
 */
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await todo_model_1.default.findByIdAndUpdate(id, { is_deleted: true }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    }
    catch (error) {
        console.log("Delete Todo Error:", error);
        res.status(500).json({ message: "Failed to delete todo" });
    }
};
exports.deleteTodo = deleteTodo;
