/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const addToCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { plant, quantity, sku, img, price, stock } = req.body;
    const session = req.session;
    if (!session.cart) {
      req.session.cart = [];
    }

    if (!session.cart) return;
    const existingItem = session.cart.find((item) => item.sku === sku);
    if (existingItem) {
      existingItem.quantity += plant.quantity;
    } else {
      session.cart.push({
        plant,
        quantity,
        sku,
        img,
        stock,
        price,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Added to Cart successfully!",
      data: req.session.cart,
    });
  }
);

const getCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Cart retrieved successfully!",
      data: req.session.cart,
    });
  }
);
export const CartController = {
  addToCart,
  getCart,
};
