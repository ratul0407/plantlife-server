import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { generateToken } from "../../utils/jwt";
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

  const jwtPayload = {
    userId: isUserExists._id,
    email: isUserExists.email,
    role: isUserExists.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES_IN
  );
  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES_IN
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...user } = isUserExists.toObject();
  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const authServices = {
  credentialsLogin,
};
