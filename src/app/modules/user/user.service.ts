import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
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
  return user;
};

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExists = await User.findOne({ email });
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExists.password as string
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }

  return {
    email: isUserExists.email,
  };
};
export const userServices = {
  createUser,
  credentialsLogin,
};
