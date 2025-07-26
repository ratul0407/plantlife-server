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
interface ICart {
  plant: Types.ObjectId;
  quantity: number;
}

export interface IUser {
  name: string;
  email: string;
  picture?: string;
  phone?: string;
  password?: string;
  isVerified?: boolean;
  isDeleted?: boolean;
  isBlocked?: boolean;
  wishlist?: Types.ObjectId[];
  coins?: number;
  cart?: ICart[];
  role: Role;
  auths: IAuthProvider[];
  reviews?: Types.ObjectId[];
  recentlyViewed?: Types.ObjectId[];
  questions?: Types.ObjectId[];
}
