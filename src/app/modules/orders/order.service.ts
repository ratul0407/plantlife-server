import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (order: IOrder) => {
  console.log(order);
  const result = await Order.create(order);
  return result;
};

const getOrder = async (userId: string) => {
  console.log(userId);
  const orders = await Order.find({ userId });
  console.log(orders);
  return orders;
};
export const OrderService = {
  createOrder,
  getOrder,
};
