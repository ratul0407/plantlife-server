/* eslint-disable @typescript-eslint/no-explicit-any */

import { Plant } from "../plant/plant.model";
import { IWishlist } from "./wishlist.interface";
import { Wishlist } from "./wishlist.model";

const getLocalWishlist = async (plants: string[]) => {
  console.log(plants);
  const wishlistPlants = await Plant.find({ _id: { $in: plants } });
  console.log(wishlistPlants);
  return wishlistPlants;
};
const mergeWishlist = async (
  userId: string,
  localWishlist: { plantId: string }[]
) => {
  const dbWishlist = await Wishlist.find({ userId: userId });

  console.log(localWishlist, "local wishlist");
  const dbPlants = dbWishlist.map((item) => item.plantId.toString());

  console.log(dbPlants, "db plants");
  const newPlants = localWishlist.filter(
    (item) => !dbPlants.includes(item.plantId)
  );
  console.log(newPlants, newPlants.length, "from new Plants");
  if (newPlants.length > 0) {
    const toInsert = newPlants.map((item) => ({
      userId: userId,
      plantId: item.plantId,
    }));
    console.log(toInsert, "from to insert");
    await Wishlist.insertMany(toInsert);
    return [];
  }
};
const addToWishlist = async (plant: IWishlist) => {
  const wishlist = await Wishlist.create(plant);
  return wishlist;
};
// const mergeWishlist = async (wishlist: any, userId: string) => {
//   const userWishlist = await Wishlist.find({ userId: userId });
//   console.log(userWishlist);

//   return {};
// };
export const wishlistServices = {
  getLocalWishlist,
  addToWishlist,
  mergeWishlist,
};
