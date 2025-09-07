import { model, Schema } from "mongoose";
import { Category, IPlant, IPlantVariant } from "./plant.interface";

const variantSchema = new Schema<IPlantVariant>(
  {
    variantName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
      default: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const plantSchema = new Schema<IPlant>(
  {
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
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
    },
    careInstructions: {
      type: String,
    },
    discount: {
      type: Number,
    },
    variants: {
      type: [variantSchema],
      required: true,
    },
    additionalImages: {
      type: [String],
    },
  },
  { timestamps: true, versionKey: false }
);

export const Plant = model<IPlant>("Plant", plantSchema);
