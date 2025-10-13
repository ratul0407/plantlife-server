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
      { quantity: newQuantity }
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
          sku: item.sku,
          price: variant.price,
          image: variant.image,
          quantity: item.quantity,
        };
      }

      return null;
    })
  );

  return results.filter(Boolean);
};

const updateQuantity = async (newQuantity: number, cartId: string) => {
  const result = await Cart.findByIdAndUpdate(cartId, {
    quantity: newQuantity,
  });
  return result;
};
const deleteCartItem = async (cartId: string) => {
  const result = await Cart.findByIdAndDelete(cartId);
  return result;
};
export const CartService = {
  addToCart,
  getCartPlants,
  updateQuantity,
  deleteCartItem,
};
