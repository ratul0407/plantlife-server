import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";

const AuthProviderSchema = new Schema<IAuthProvider>({
  provider: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
});
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
    wishlist: { type: [String], default: [] },
    coins: { type: Number, default: 0 },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    auths: [AuthProviderSchema],
    cart: { type: [Schema.Types.ObjectId], ref: "Plants", default: [] },
    reviews: { type: [Schema.Types.ObjectId], ref: "Reviews", default: [] },
    recentlyViewed: {
      type: [Schema.Types.ObjectId],
      ref: "Plants",
      default: [],
    },
    questions: { type: [Schema.Types.ObjectId], ref: "Questions", default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
