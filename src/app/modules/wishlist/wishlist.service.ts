/* eslint-disable @typescript-eslint/no-explicit-any */

import { Plant } from "../plant/plant.model";
import { IWishlist } from "./wishlist.interface";
import { Wishlist } from "./wishlist.model";

const getUserWishlist = async (userId: string) => {
  const wishlist = await Wishlist.find({ userId: userId });
  return wishlist;
};
const getLocalWishlist = async (plants: string[]) => {
  const wishlistPlants = await Plant.find({ _id: { $in: plants } })
    .select("name category createdAt  variants")
    .sort("-createdAt");

  return wishlistPlants;
};
const mergeWishlist = async (
  userId: string,
  localWishlist: { plantId: string }[]
) => {
  const dbWishlist = await Wishlist.find({ userId: userId });

  const dbPlants = dbWishlist.map((item) => item.plantId.toString());

  const newPlants = localWishlist.filter(
    (item) => !dbPlants.includes(item.plantId)
  );

  if (newPlants.length > 0) {
    const toInsert = newPlants.map((item) => ({
      userId: userId,
      plantId: item.plantId,
    }));
    await Wishlist.insertMany(toInsert);
    return [];
  }
};
const addToWishlist = async (plant: IWishlist) => {
  const wishlist = await Wishlist.create(plant);
  return wishlist;
};

const deleteWishlist = async (plantId: string) => {
  await Wishlist.deleteOne({ plantId: plantId });
};
export const wishlistServices = {
  getUserWishlist,
  getLocalWishlist,
  addToWishlist,
  deleteWishlist,
  mergeWishlist,
};
