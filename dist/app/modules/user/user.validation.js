"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ error: "Name must be a string" })
        .min(2, { message: "Name too short minimum 2 characters required" })
        .max(50, { message: "Name too long maximum 50 characters allowed" }),
    email: zod_1.default
        .email({ error: "Email must be string" })
        .min(5, { message: "email too short" })
        .max(50, { message: "Email is too long!" }),
    password: zod_1.default
        .string({ error: "Password must be a string" })
        .min(8, { message: "Password must be at least 8 characters long!" })
        .max(32, { message: "Password cannot be more than 32 characters long!" }),
    picture: zod_1.default.url().optional(),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ error: "Name must be a string" })
        .min(2, { message: "Name too short minimum 2 characters required" })
        .max(50, { message: "Name too long maximum 50 characters allowed" })
        .optional(),
    password: zod_1.default
        .string({ error: "Password must be a string" })
        .min(8, { message: "Password must be at least 8 characters long!" })
        .max(32, { message: "Password cannot be more than 32 characters long!" })
        .optional(),
    picture: zod_1.default.url().optional(),
    wishlist: zod_1.default.string().optional(),
    coins: zod_1.default.number().optional(),
    role: zod_1.default.enum([user_interface_1.Role.ADMIN, user_interface_1.Role.STAFF]).optional(),
    reviews: zod_1.default.string().optional(),
    recentlyViewed: zod_1.default.string().optional(),
    questions: zod_1.default.string().optional(),
});
