/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PlantService } from "./plant.service";
import { IPlant, IPlantVariant } from "./plant.interface";
import { JwtPayload } from "jsonwebtoken";

const createPlant = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { variants, ...rest } = req.body;

    const parsedVariants = JSON.parse(variants);

    const images = ((req.files as any)["images"] || []).map((f: any) => f.path);

    const variantImages = ((req.files as any)["variantImages"] || []).map(
      (f: any) => f.path
    );

    const updatedVariants = parsedVariants?.map(
      (item: IPlantVariant, index: number) => ({
        ...item,
        inStock: item?.stock > 0 ? true : false,
        image: variantImages[index],
        sku: `PLANT-${item.variantName.split(" ").join("-")}-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}-${index}`,
      })
    );

    const payload: IPlant = {
      ...rest,
      variants: updatedVariants,
      additionalImages: images,
    };

    const result = await PlantService.createPlant(payload);
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
    const query = req.query;
    const result = await PlantService.getAllPlants(
      query as Record<string, string>
    );
    sendResponse(res, {
      statusCode: 201,
      message: "Plants retrieved successfully!",
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

const getLocalCartPlants = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { plants } = req.body;
    console.log("I was here");
    console.log(plants, "from plantController");
    const result = await PlantService.getLocalCartPlants(plants);
    console.log(result);
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
  getLocalCartPlants,
};
