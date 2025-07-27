/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await authServices.credentialsLogin(payload);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Logged in successfully!",
      data: result,
    });
  }
);

export const authController = {
  credentialsLogin,
};
