/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CartService } from "./cart.service";
import { JwtPayload } from "jsonwebtoken";

const addToCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const payload = {
      ...req.body,
      userId,
    };
    const result = await CartService.addToCart(payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Added to Cart successfully!",
      data: result,
    });
  }
);

const getCartPlants = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await CartService.getCartPlants(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "retrieved user cart successfully!",
      data: result,
    });
  }
);

const updateQuantity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { newQuantity, sku } = req.body;
    const { userId } = req.user as JwtPayload;
    const result = await CartService.updateQuantity(newQuantity, userId, sku);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Plant quantity updated",
      data: result,
    });
  }
);

const deleteCartItem = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const { sku } = req.body;

    await CartService.deleteCartItem(sku, userId);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Cart deleted successfully!",
      data: null,
    });
  }
);

const deleteCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;

    await CartService.deleteCart(userId);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Cart deleted successfully!",
      data: null,
    });
  }
);
export const CartController = {
  addToCart,
  getCartPlants,
  updateQuantity,
  deleteCartItem,
  deleteCart,
};
