/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PlantService } from "./plant.service";
import { IPlant } from "./plant.interface";

const createPlant = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: IPlant = {
      ...req.body,
      images: req.files,
    };

    console.log(payload);
    const result = await PlantService.createPlant(req.body);
    sendResponse(res, {
      statusCode: 201,
      message: "Plant created successfully!",
      success: true,
      data: result,
    });
  }
);
const getAllPlants = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await PlantService.getAllPlants();
    sendResponse(res, {
      statusCode: 201,
      message: "Plant created successfully!",
      success: true,
      data: result,
    });
  }
);
const getSinglePlant = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("I was here");
    console.log(req.params);
    const { id } = req.params;
    const result = await PlantService.getSinglePlant(id);
    sendResponse(res, {
      statusCode: 201,
      message: "Plant created successfully!",
      success: true,
      data: result,
    });
  }
);

const myWishlistPlant = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("I was here");
    console.log(req.params);
    const { id } = req.params;
    const result = await PlantService.myWishlistPlant(id);
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
  getAllPlants,
  getSinglePlant,
  myWishlistPlant,
};
