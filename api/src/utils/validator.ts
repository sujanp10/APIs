import Joi from "@hapi/joi";
import createHttpError from "http-errors";
import { NextFunction } from "express";

const validator = async (
  schema: Joi.ObjectSchema,
  body: Object,
  next: NextFunction
) => {
  const value = await schema.validate(body);

  try {
    value.error
      ? next(createHttpError(422, value.error.details[0].message))
      : next();
  } catch (err) {
    console.log(err);
  }
};

export default validator;
