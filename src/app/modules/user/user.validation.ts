import z from "zod";
import { Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ error: "Name must be a string" })
    .min(2, { message: "Name too short minimum 2 characters required" })
    .max(50, { message: "Name too long maximum 50 characters allowed" }),
  email: z
    .email({ error: "Email must be string" })
    .min(5, { message: "email too short" })
    .max(50, { message: "Email is too long!" }),
  password: z
    .string({ error: "Password must be a string" })
    .min(8, { message: "Password must be at least 8 characters long!" })
    .max(32, { message: "Password cannot be more than 32 characters long!" }),
  picture: z.url().optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ error: "Name must be a string" })
    .min(2, { message: "Name too short minimum 2 characters required" })
    .max(50, { message: "Name too long maximum 50 characters allowed" })
    .optional(),

  password: z
    .string({ error: "Password must be a string" })
    .min(8, { message: "Password must be at least 8 characters long!" })
    .max(32, { message: "Password cannot be more than 32 characters long!" })
    .optional(),
  picture: z.url().optional(),
  wishlist: z.string().optional(),
  coins: z.number().optional(),
  role: z.enum([Role.ADMIN, Role.STAFF]).optional(),
  reviews: z.string().optional(),
  recentlyViewed: z.string().optional(),
  questions: z.string().optional(),
});
