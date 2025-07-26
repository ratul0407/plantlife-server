/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err, "from global error handler");
  res.status(500).json({
    success: false,
    message: `Something went wrong! ${err.message}`,
    error: err,
    stack: envVars.NODE_ENV == "development" ? err.stack : null,
  });
};
