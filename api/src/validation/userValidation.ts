import validator from "../utils/validator";
import { Request, Response, NextFunction } from "express";
import { userSchema } from "./userSchema";

export const signupUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await validator(userSchema.signupUser, req.body, next);
};

export const signinUserValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await validator(userSchema.signinUser, req.body, next);
};
