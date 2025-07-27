import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
export const checkAuth =
  (...authRole: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppError(403, "No AccessToken received");
      }
      const verifiedToken = jwt.verify(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      if (!authRole.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route");
      }
      req.user = verifiedToken;
      console.log(verifiedToken);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
