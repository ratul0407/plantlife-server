export enum Category {
  EASY_CARE = "EASY_CARE",
  HANGING = "HANGING",
  AIR_PURIFYING = "AIR_PURIFYING",
  SUN_LOVING = "SUN_LOVING",
  LOW_LIGHT = "LOW_LIGHT",
  FLOWERING = "FLOWERING",
}
export interface IPlantVariant {
  variantName: string;
  price: number;
  inStock: boolean;
  stock: boolean;
  image: string;
  sku: string;
}
export interface IStats {
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
  variant: [IPlantVariant];
  additionalImages: string[];
  tags?: string[];
  careInstructions?: string;
  discount?: number;
}
