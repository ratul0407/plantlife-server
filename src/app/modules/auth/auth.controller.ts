/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookie } from "../../utils/setAuthCookie";
import { envVars } from "../../config/env";
import passport from "passport";
import { userServices } from "../user/user.service";
const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new AppError(401, "User does not exist"));
      }

      const userTokens = await createUserTokens(user);

      const { password: pass, ...rest } = user.toObject();
      setAuthCookie(res, userTokens);
      sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Logged in successfully!",
        data: {
          accessToken: userTokens.accessToken,
          refreshToken: userTokens.refreshToken,
          user: rest,
        },
      });
    })(req, res, next);

    //   const payload = req.body;
    //   const result = await AuthServices.credentialsLogin(payload);
    //   res.cookie("accessToken", result.accessToken, {
    //     httpOnly: true,
    //     secure: false,
    //   });
    //   res.cookie("refreshToken", result.refreshToken, {
    //     httpOnly: true,
    //     secure: false,
    //   });
    //   sendResponse(res, {
    //     success: true,
    //     statusCode: 201,
    //     message: "Logged in successfully!",
    //     data: result,
    //   });
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
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

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
const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user as JwtPayload;
    const changedPassword = await AuthServices.resetPassword(
      oldPassword,
      newPassword,
      decodedToken
    );
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Password changed successfully!",
      data: changedPassword,
    });
  }
);

const googleCallbackController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let redirectTo = req.query.state ? (req.query.state as string) : "";
    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const tokenInfo = createUserTokens(user);
    setAuthCookie(res, tokenInfo);

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
  }
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.user as JwtPayload;
    const result = await userServices.getMe(userId);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User retrieved successfully!",
      data: result,
    });
  }
);
export const AuthController = {
  credentialsLogin,
  getNewAccessToken,
  logOut,
  resetPassword,
  googleCallbackController,
  getMe,
};
