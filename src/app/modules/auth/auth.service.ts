import AppError from "../../errorHelpers/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { createUserTokens } from "../../utils/userTokens";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
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

  const { accessToken, refreshToken } = createUserTokens(isUserExists);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...user } = isUserExists.toObject();
  return {
    accessToken,
    refreshToken,
    user,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const isUserExists = await User.findOne({
    email: verifiedRefreshToken.email,
  });

  if (isUserExists?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is delete");
  }

  const jwtPayload = {
    userId: isUserExists?._id,
    email: isUserExists?.email,
    role: isUserExists?.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES_IN
  );

  return {
    accessToken,
  };
};
export const authServices = {
  credentialsLogin,
  getNewAccessToken,
};
