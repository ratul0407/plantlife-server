/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { wishlistServices } from "./wishlist.service";

const addToWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const result = await wishlistServices.addToWishlist();
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Added to wishlist successfully!",
      data: result,
    });
  }
);

export const wishlistController = {
  addToWishlist,
};
