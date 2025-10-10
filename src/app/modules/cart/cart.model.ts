import { model, Schema } from "mongoose";

import { ICartItem } from "./cart.interface";

const cartSchema = new Schema<ICartItem>(
  {
    plantId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    sku: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Cart = model<ICartItem>("Cart", cartSchema);
