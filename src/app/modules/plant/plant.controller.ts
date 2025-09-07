/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PlantService } from "./plant.service";
import { IPlant, IPlantVariant } from "./plant.interface";

const createPlant = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body, "from create plant controller");
    const { variants, ...rest } = req.body;
    console.log(variants);
    const parsedVariants = JSON.parse(variants);
    const images = (req.files["images"] || []).map((f) => f.path);
    const variantImages = (req.files["variantImages"] || []).map((f) => f.path);
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

    console.log(updatedVariants);
    const payload: IPlant = {
      ...rest,
      variants: updatedVariants,
      additionalImages: images,
    };

    console.log(req.files);

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
