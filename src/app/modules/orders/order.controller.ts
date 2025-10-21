/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OrderService } from "./order.service";
import { JwtPayload } from "jsonwebtoken";
import { IOrderItem } from "./order.interface";

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { items, totalPrice } = req.body;
    const { userId } = req.user as JwtPayload;
    const order = {
      items,
      totalPrice,
      userId,
      status: "PENDING",
    };
    const result = await OrderService.createOrder(order);
    sendResponse(res, {
      data: result,
      success: true,
      statusCode: 201,
      message: "Order created successfully",
    });
  }
);

const getOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const result = await OrderService.getOrder(userId);
    sendResponse(res, {
      data: result,
      success: true,
      statusCode: 200,
      message: "Orders retrieved successfully",
    });
  }
);
export const OrderController = {
  createOrder,
  getOrder,
};
