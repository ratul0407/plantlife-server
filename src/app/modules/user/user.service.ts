/* eslint-disable @typescript-eslint/no-non-null-assertion */

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

export const userServices = {
  createUser,
  getMe,
  getAllUsers,
  updateUser,
};
