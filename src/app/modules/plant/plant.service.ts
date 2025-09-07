import { IPlant } from "./plant.interface";
import { Plant } from "./plant.model";

const createPlant = async (plant: IPlant) => {
  console.log(plant);
  const createdPlant = await Plant.create(plant);
  return createdPlant;
};
const getAllPlants = async () => {
  const data = await Plant.aggregate([
    {
      $project: {
        name: 1,
        price: "$basePrice",
        img: {
          $let: {
            vars: {
              matchedVariant: {
                $first: {
                  $filter: {
                    input: "$variants",
                    as: "variant",
                    cond: { $eq: ["$$variant.id", "$defaultVariant"] },
                  },
                },
              },
            },
            in: "$$matchedVariant.img",
          },
        },
        second_img: {
          $let: {
            vars: {
              otherVariants: {
                $filter: {
                  input: "$variants",
                  as: "variant",
                  cond: { $ne: ["$$variant.id", "$defaultVariant"] },
                },
              },
            },
            in: {
              $cond: {
                if: { $gt: [{ $size: "$$otherVariants" }, 0] },
                then: { $first: "$$otherVariants.img" },
                else: { $arrayElemAt: ["$more_images", 0] },
              },
            },
          },
        },
      },
    },
  ]);
  return data;
};
const getSinglePlant = async (id: string) => {
  const data = await Plant.findById(id);
  return data;
};
const myWishlistPlant = async (id: string) => {
  const data = await Plant.findById(id);
  return data;
};
export const PlantService = {
  createPlant,
  getAllPlants,
  getSinglePlant,
  myWishlistPlant,
};
