/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createUser(req.body);
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
    });
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
    });
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User created successfully!",
      data: result,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "All users retrieved successfully!",
      data: result,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const token = req.user as JwtPayload;

    const result = await userServices.updateUser(id, req.body, token);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Updated User successfully!",
      data: result,
    });
  }
);

const myWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("I was hit");
    const { userId } = req.user as JwtPayload;
    const result = await userServices.myWishlist(userId);
    sendResponse(res, {
      statusCode: 201,
      message: "Wishlist retrieved successfully!",
      success: true,
      data: result,
    });
  }
);
const addToWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const { plant } = req.body;
    console.log(userId);
    console.log("I was here");
    const result = await userServices.addToWishlist(userId, plant);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Added to wishlist",
      data: result,
    });
  }
);
const addManyToWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    console.log("I was here");
    const { plants } = req.body;
    console.log(plants);
    const result = await userServices.addManyToWishlist(userId, plants);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Added to wishlist",
      data: result,
    });
  }
);
const removeFromWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const { plant } = req.body;

    const result = await userServices.removeFromWishlist(userId, plant);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Plant removed from wishlist",
      data: result,
    });
  }
);

export const userController = {
  createUser,
  getAllUsers,
  updateUser,
  addToWishlist,
  removeFromWishlist,

  myWishlist,
  addManyToWishlist,
};
