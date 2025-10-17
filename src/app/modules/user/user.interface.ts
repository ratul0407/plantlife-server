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

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}
export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  picture?: string;
  phone?: string;
  password?: string;
  isVerified?: boolean;
  isActive: IsActive;
  isDeleted?: boolean;
  coins?: number;
  role: Role;
  auths: IAuthProvider[];
  reviews?: Types.ObjectId[];
  questions?: Types.ObjectId[];
}
