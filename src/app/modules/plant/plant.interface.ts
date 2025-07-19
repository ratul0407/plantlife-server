import { Types } from "mongoose";

enum Category {
  EASY_CARE = "EASY_CARE",
  HANGING = "HANGING",
  AIR_PURIFYING = "AIR_PURIFYING",
  SUN_LOVING = "SUN_LOVING",
  LOW_LIGHT = "LOW_LIGHT",
  FLOWERING = "FLOWERING",
}
interface IPlantVariant {
  variantName: string;
  price: number;
  inStock: boolean;
  stock: boolean;
  image: string;
  sku: string;
}
interface IStats {
  rating?: number;
  wishlist?: number;
  cart?: number;
  viewed?: number;
}
export interface IPlant {
  name: string;
  description: string;
  category: Category;
  basePrice: number;
  inStock: boolean;
  stock: number;
  mainImage: string[];
  variant: [IPlantVariant];
  additionalImages: string[];
  tags?: string;
  careInstructions?: string;
  reviews?: Types.ObjectId[];
  stats: IStats;
  question?: Types.ObjectId[];
  discount?: number;
}
