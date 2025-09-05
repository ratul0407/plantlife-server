/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleZodError } from "../helpers/handleZodError";
import { handleCastError } from "../helpers/handleCastError";
import { handleValidationError } from "../helpers/handleValidationError";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = `Something went wrong!`;
  let errorSources: any = [];
  ///mongoose duplicate error
  if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
  } else if (err.name === "ZodError") {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err.name === "CastError") {
    //mongoose validation error
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
  } else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }
  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
