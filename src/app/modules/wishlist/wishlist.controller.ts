/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { wishlistServices } from "./wishlist.service";
import { JwtPayload } from "jsonwebtoken";

const getLocalWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await wishlistServices.getLocalWishlist(req.body);
    console.log(result, "result front wishlist controller");
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Added to wishlist successfully!",
      data: result,
    });
  }
);
const addToWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const wishlist = {
      ...req.body,
      userId,
    };
    const result = await wishlistServices.addToWishlist(wishlist);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Added to wishlist successfully!",
      data: result,
    });
  }
);
const mergeWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;

    const result = await wishlistServices.mergeWishlist(userId, req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Added to wishlist successfully!",
      data: result,
    });
  }
);

export const wishlistController = {
  getLocalWishlist,
  addToWishlist,
  mergeWishlist,
};
