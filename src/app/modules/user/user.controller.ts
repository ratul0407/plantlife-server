/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createUser(req.body);
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
export const userController = {
  createUser,

  getAllUsers,
  updateUser,
};
