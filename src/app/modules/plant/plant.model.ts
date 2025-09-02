import { model, Schema } from "mongoose";
import { Category, IPlant } from "./plant.interface";

const plantSchema = new Schema<IPlant>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(Category),
  },
  basePrice: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
  },
  careInstructions: {
    type: String,
  },
});

export const Plant = model<IPlant>("Plant", plantSchema);
