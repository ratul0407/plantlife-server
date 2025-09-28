import { model, Schema } from "mongoose";
import { IWishlist } from "./wishlist.interface";

const wishlistSchema = new Schema<IWishlist>(
  {
    userId: { type: String, required: true },
    plantId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

export const Wishlist = model<IWishlist>("Wishlist", wishlistSchema);
