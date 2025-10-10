import { ICartItem } from "./cart.interface";
import { Cart } from "./cart.model";

const addToCart = async (cart: ICartItem, userId: string) => {
  const { plantId } = cart;

  const allUserPlants = await Cart.find({ userId: userId });

  const result = await Cart.create(cart);
  return result;
};

export const CartService = {
  addToCart,
};
