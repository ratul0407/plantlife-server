import { Types } from "mongoose";

export enum Role {
  USER = "USER",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}
export interface IUser {
  name: string;
  email: string;
  picture?: string;
  password?: string;
  isVerified?: string;
  isDeleted?: string;
  isBlocked?: string;
  wishlist?: Types.ObjectId[];
  orders?: Types.ObjectId[];
  coins?: number;
  role: Role;
  auths: IAuthProvider[];
}
