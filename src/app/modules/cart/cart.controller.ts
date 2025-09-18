/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CartServices } from "./cart.service";

const addToCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { plant } = req.body;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    const result = await CartServices.addToCart(plant, req.session.cart);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Added to Cart successfully!",
      data: null,
    });
  }
);

export const CartController = {
  addToCart,
};
