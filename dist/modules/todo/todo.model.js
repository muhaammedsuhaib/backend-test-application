"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const Todo = (0, mongoose_1.model)("Todo", todoSchema);
exports.default = Todo;
