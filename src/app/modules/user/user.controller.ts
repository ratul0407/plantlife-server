import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
