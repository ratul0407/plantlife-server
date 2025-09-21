// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { SessionData } from "express-session";

// const addToCart = async (plant: any, session: Partial<SessionData>) => {
//   if (!session.cart) return;
//   const existingItem = session.cart.find((item) => item.sku === plant.sku);
//   if (existingItem) {
//     existingItem.quantity += plant.quantity;
//   } else {
//     session.cart.push({
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       ...plant,
//     });
//   }
// };

// export const CartServices = {
//   addToCart,
// };
