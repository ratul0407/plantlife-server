import mongoose from "mongoose";
import { Plant } from "../plant/plant.model";
import { ICartItem } from "./cart.interface";
import { Cart } from "./cart.model";

const addToCart = async (cart: ICartItem) => {
  const isExist = await Cart.findOne({ sku: cart.sku });
  if (isExist) {
    const newQuantity = isExist.quantity + cart.quantity;
    const result = await Cart.findOneAndUpdate(
      { sku: cart.sku },
      { quantity: newQuantity },
      { new: true }
    );
    return result;
  }
  const result = await Cart.create(cart);
  return result;
};

const getCartPlants = async (cartPlants: ICartItem[]) => {
  const results = await Promise.all(
    cartPlants.map(async (item) => {
      const plant = await Plant.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(item.plantId) } },
        {
          $project: {
            name: 1,
            variants: {
              $filter: {
                input: "$variants",
                as: "variant",
                cond: { $eq: ["$$variant.sku", item.sku] },
              },
            },
          },
        },
      ]);

      if (plant.length > 0) {
        const variant = plant[0].variants[0];
        return {
          name: plant[0].name,
          plantId: plant[0]._id,
          sku: item.sku,
          price: variant.price,
          image: variant.image,
          quantity: item.quantity,
          variant: variant.variantName,
        };
      }

      return null;
    })
  );

  return results.filter(Boolean);
};

const updateQuantity = async (
  newQuantity: number,
  userId: string,
  sku: string
) => {
  const result = await Cart.findOneAndUpdate(
    { sku: sku, userId: userId },
    { quantity: newQuantity },
    { new: true }
  );
  return result;
};
const deleteCartItem = async (sku: string, userId: string) => {
  const result = await Cart.findOneAndDelete({ sku, userId });
  return result;
};
export const CartService = {
  addToCart,
  getCartPlants,
  updateQuantity,
  deleteCartItem,
};
