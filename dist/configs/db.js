"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MongoDB connection URI is not defined in the .env file');
        }
        await mongoose_1.default.connect(mongoURI, {
            dbName: 'todoapp',
            autoIndex: true,
            maxPoolSize: 10,
        });
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
exports.default = connectDB;
