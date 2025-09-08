import mongoose from "mongoose";
import { User } from "../user/user.model";
import { IPlant } from "./plant.interface";
import { Plant } from "./plant.model";
import { plantSearchableFields } from "./plant.constants";
import { QueryBuilder } from "../../utils/queryBuilder";

const createPlant = async (plant: IPlant) => {
  console.log(plant);
  const createdPlant = await Plant.create(plant);
  return createdPlant;
};
const getAllPlants = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Plant.find(), query);
  console.log(query);
  const tours = await queryBuilder
    .search(plantSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  // const meta = await queryBuilder.getMeta();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);
  return {
    data,
    meta,
  };
};
const getSinglePlant = async (id: string) => {
  const data = await Plant.findById(id);
  return data;
};
const myWishlistPlant = async (id: string) => {
  // const plants = await User.aggregate([
  //   { $match: { _id: id } },
  // { $unwind: "$wishlist" }, // break array into objects
  // {
  //   $lookup: {
  //     from: "plants",
  //     localField: "wishlist.plant",
  //     foreignField: "_id",
  //     as: "wishlist.plantDetails",
  //   },
  // },
  // { $unwind: "$wishlist.plantDetails" }, // flatten plant details
  // {
  //   $group: {
  //     _id: "$_id",
  //     wishlist: { $push: "$wishlist" },
  //   },
  // },
  // ]);
  // console.log(plants);
  const userPlants = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $unwind: "$wishlist" },
    {
      $lookup: {
        from: "plants",
        localField: "wishlist.plant",
        foreignField: "_id",
        as: "wishlist.plantDetails",
      },
    },
    { $unwind: "$wishlist.plantDetails" }, // flatten plant details
    {
      $group: {
        _id: "$_id",
        wishlist: { $push: "$wishlist" },
      },
    },
  ]);
  return userPlants;
};

const removeFromWishlist = async (userId: string, plant: string) => {
  await User.findByIdAndUpdate(userId, {
    $pull: { wishlist: { plant: plant } },
  });
};
export const PlantService = {
  createPlant,
  getAllPlants,
  getSinglePlant,
  myWishlistPlant,
  removeFromWishlist,
};
