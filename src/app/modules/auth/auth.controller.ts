/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await authServices.credentialsLogin(payload);

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
      message: "Logged in successfully!",
      data: result,
    });
  }
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "No refresh token from the cookies"
      );
    }
    const tokenInfo = await authServices.getNewAccessToken(refreshToken);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Refresh Token created successfully!",
      data: tokenInfo,
    });
  }
);

const logOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User logged out successfully!",
      data: null,
    });
  }
);
export const authController = {
  credentialsLogin,
  getNewAccessToken,
  logOut,
};
