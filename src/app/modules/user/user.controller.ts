/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";

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
const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.credentialsLogin(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User logged in successfully!",
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
    const token = req.headers.authorization;
    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_SECRET
    ) as JwtPayload;
    const result = await userServices.updateUser(id, req.body, verifiedToken);
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
  credentialsLogin,
  getAllUsers,
  updateUser,
};
