import { model, Schema } from "mongoose";
import { IOrder, IOrderItem } from "./order.interface";

const orderItemSchema = new Schema<IOrderItem>({
  plantId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  sku: {
    type: String,
    required: true,
  },
});
const orderSchema = new Schema<IOrder>(
  {
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Order = model<IOrder>("Order", orderSchema);
