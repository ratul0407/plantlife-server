import mongoose from "mongoose";
import { User } from "../user/user.model";
import { IPlant } from "./plant.interface";
import { Plant } from "./plant.model";

const createPlant = async (plant: IPlant) => {
  console.log(plant);
  const createdPlant = await Plant.create(plant);
  return createdPlant;
};
const getAllPlants = async () => {
  const plants = Plant.find({});
  return plants;
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
export const PlantService = {
  createPlant,
  getAllPlants,
  getSinglePlant,
  myWishlistPlant,
};
