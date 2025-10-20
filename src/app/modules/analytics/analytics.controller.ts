/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AnalyticsServices } from "./analytics.service";

const userAnalytics = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AnalyticsServices.getUserAnalytics();

    sendResponse(res, {
      success: true,
      message: "User analytics retrieved successfully",
      statusCode: 201,
      data: result,
    });
  }
);

const PlantAnalytics = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AnalyticsServices.getPlantAnalytics();
    sendResponse(res, {
      success: true,
      message: "User analytics retrieved successfully",
      statusCode: 201,
      data: result,
    });
  }
);

export const AnalyticsController = {
  userAnalytics,
  PlantAnalytics,
};
