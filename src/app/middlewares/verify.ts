import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import jwt from "jsonwebtoken";
import { envVars } from "../config/env";
const verify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new AppError(403, "No AccessToken received");
    }
    const verifiedToken = jwt.verify(accessToken, envVars.JWT_SECRET);
    console.log(verifiedToken);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default verify;
