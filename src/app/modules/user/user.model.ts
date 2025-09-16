import { model, Schema } from "mongoose";
import {
  IAuthProvider,
  ICart,
  IsActive,
  IUser,
  IWishlist,
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

const wishlistSchema = new Schema<IWishlist>(
  {
    plant: {
      type: Schema.Types.ObjectId,
      ref: "Plants",
      required: true,
      unique: true,
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const cartSchema = new Schema<ICart>(
  {
    plant: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { _id: false, versionKey: false, timestamps: true }
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
    wishlist: [wishlistSchema],
    coins: { type: Number, default: 0 },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    auths: [AuthProviderSchema],
    cart: [cartSchema],
    reviews: { type: [Schema.Types.ObjectId], ref: "Reviews", default: [] },

    questions: { type: [Schema.Types.ObjectId], ref: "Questions", default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
