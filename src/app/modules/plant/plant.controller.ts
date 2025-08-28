/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PlantService } from "./plant.service";

const createPlant = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PlantService.createPlant(req.body);
    sendResponse(res, {
      statusCode: 201,
      message: "Plant created successfully!",
      success: true,
      data: result,
    });
  }
);

export const plantController = {
  createPlant,
};
