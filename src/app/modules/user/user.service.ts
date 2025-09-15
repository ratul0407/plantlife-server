/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from "mongoose";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { createUserTokens } from "../../utils/userTokens";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";

import { JwtPayload } from "jsonwebtoken";
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  const { accessToken, refreshToken } = createUserTokens(user);
  return {
    user,
    accessToken,
    refreshToken,
  };
};

const getAllUsers = async () => {
  return User.find({});
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const isUserExists = await User.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }
  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.STAFF) {
      throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized");
    }
    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized");
    }
  }
  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUND
    );
  }
  const newUpdatedUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdatedUser;
};

const getMe = async (id: string) => {
  const user = await User.findById(id).select("-password");
  return user;
};

const myWishlist = async (id: string) => {
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
const addToWishlist = async (id: string, plant: string) => {
  const user = await User.findById(id);
  const plantExists = user?.wishlist?.some(
    (item) => item.plant.toString() === plant
  );

  if (plantExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Plant is already in wishlist");
  }
  const updatedUser = User.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        wishlist: {
          plant,
        },
      },
    },
    { runValidators: true, new: true }
  );
  return updatedUser;
};
const removeFromWishlist = async (id: string, plant: string) => {
  console.log(id, plant);

  console.log("i was here");
  const updatedUser = User.findByIdAndUpdate(
    id,
    {
      $pull: {
        wishlist: {
          plant: plant,
        },
      },
    },
    { runValidators: true, new: true }
  );
  return updatedUser;
};

const addManyToWishlist = async (id: string, plants: string[]) => {
  const user = await User.findById(id).select("wishlist");

  if (!user) {
    return null;
  }

  const existingPlantIds = user?.wishlist!.map((item) => item.plant.toString());

  const newPlantsToAdd = plants.filter(
    (plantId) => !existingPlantIds.includes(plantId)
  );

  if (newPlantsToAdd.length === 0) {
    return user;
  }

  const objectsToAdd = newPlantsToAdd.map((plantId) => ({ plant: plantId }));

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        wishlist: {
          $each: objectsToAdd,
        },
      },
    },
    { new: true }
  );

  return updatedUser;
};
const addToCart = async (
  id: string,
  plant: string,
  quantity: string,
  sku: string
) => {
  const user = await User.findById(id);

  const sameSku = user?.cart?.some((item) => item.sku === sku);

  if (sameSku) {
    const quantity = user?.cart?.find((item) => item.sku === sku)?.quantity;
    if (quantity) {
      return updateCart(id, sku, quantity + 1);
    }
  }

  const updatedUser = User.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        cart: {
          plant,
          quantity,
          sku,
        },
      },
    },
    { runValidators: true, new: true }
  );
  return updatedUser;
};

const myCart = async (id: string) => {
  const userPlants = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $unwind: "$cart" },
    {
      $lookup: {
        from: "plants",
        localField: "cart.plant",
        foreignField: "_id",
        as: "cart.plantDetails",
      },
    },
    { $unwind: "$cart.plantDetails" }, // flatten plant details
    {
      $group: {
        _id: "$_id",
        cart: { $push: "$cart" },
      },
    },
  ]);
  return userPlants;
};

const updateCart = async (user: string, sku: string, quantity: number) => {
  console.log("I was here");
  const updatedUser = User.findByIdAndUpdate(
    user,
    {
      $set: {
        "cart.$[item].quantity": quantity,
      },
    },
    {
      new: true,
      arrayFilters: [{ "item.sku": sku }],
    }
  );
  console.log(updatedUser);
  return updatedUser;
};

const removeFromCart = async (id: string, sku: string) => {
  const updatedUser = User.findOneAndUpdate(
    { _id: id },
    {
      $pull: {
        cart: {
          sku: sku,
        },
      },
    },
    { runValidators: true, new: true }
  );
  return updatedUser;
};

export const userServices = {
  createUser,
  getMe,
  getAllUsers,
  updateUser,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  myCart,
  updateCart,
  removeFromCart,
  myWishlist,
  addManyToWishlist,
};
