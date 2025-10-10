/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CartService } from "./cart.service";
import { JwtPayload } from "jsonwebtoken";

const addToCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.user as JwtPayload;
    const result = await CartService.addToCart(req.body, userId);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Added to Cart successfully!",
      data: result,
    });
  }
);

// const getCart = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     sendResponse(res, {
//       statusCode: 201,
//       success: true,
//       message: "Cart retrieved successfully!",
//       data: req.session.cart,
//     });
//   }
// );

// const removeFromCart = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { sku } = req.body;
//     if (req.session.cart) {
//       req.session.cart = req.session.cart.filter((item) => !(item.sku === sku));
//     }
//     sendResponse(res, {
//       success: true,
//       statusCode: 201,
//       message: "Plant Removed from cart!",
//       data: req.session.cart,
//     });
//   }
// );

// const updateCart = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { sku, quantity } = req.body;

//     if (req.session.cart) {
//       req.session.cart.filter((item) =>
//         item.sku === sku ? (item.quantity = quantity) : item?.quantity
//       );
//     }
//     sendResponse(res, {
//       statusCode: 201,
//       success: true,
//       message: "Cart retrieved successfully!",
//       data: req.session.cart,
//     });
//   }
// );

export const CartController = {
  addToCart,
  //   getCart,
  //   removeFromCart,
  //   updateCart,
};
