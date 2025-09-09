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
export interface ICart {
  plant: Types.ObjectId;
  sku: string;
  quantity: number;
}

export interface IWishlist {
  plant: Types.ObjectId;
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
  wishlist?: IWishlist[];
  coins?: number;
  cart?: ICart[];
  role: Role;
  auths: IAuthProvider[];
  reviews?: Types.ObjectId[];
  questions?: Types.ObjectId[];
}
