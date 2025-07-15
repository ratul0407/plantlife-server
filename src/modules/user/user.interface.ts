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
interface IOrder {
  all?: Types.ObjectId[];
  delivered?: Types.ObjectId[];
  pending?: Types.ObjectId[];
  cancelled?: Types.ObjectId[];
}
export interface IUser {
  name: string;
  email: string;
  phone?: string;
  picture?: string;
  password?: string;
  isVerified?: string;
  isDeleted?: string;
  isBlocked?: string;
  wishlist?: Types.ObjectId[];
  orders?: IOrder;
  coins?: number;
  cart?: ICart[];
  role: Role;
  auths: IAuthProvider[];
  reviews?: Types.ObjectId[];
  recentlyViewed?: Types.ObjectId[];
  questions?: Types.ObjectId[];
}
