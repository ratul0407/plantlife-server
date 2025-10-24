import { model, Schema } from "mongoose";
import {
  Division,
  IAddress,
  IAuthProvider,
  IsActive,
  IUser,
  Role,
} from "./user.interface";

const AuthProviderSchema = new Schema<IAuthProvider>(
  {
    provider: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
  },
  { _id: false, timestamps: true, versionKey: false }
);

const addressSchema = new Schema<IAddress>(
  {
    division: { type: String, enum: Object.values(Division), required: true },
    district: { type: String, required: true },
    subDistrict: { type: String, required: true },
    zip: { type: Number, required: true },
    streetAddress: { type: String, required: true },
  },
  {
    versionKey: "false",
    _id: false,
  }
);
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    picture: { type: String },
    isVerified: { type: Boolean },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
    coins: { type: Number, default: 0 },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    auths: [AuthProviderSchema],
    address: { type: addressSchema, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
