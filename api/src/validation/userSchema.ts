import Joi from "@hapi/joi";

export const userSchema = {
  signupUser: Joi.object({
    name: Joi.string().required().min(4),
    email: Joi.string().email().required().min(10),
    password: Joi.string().min(6),
  }),
  signinUser: Joi.object({
    email: Joi.string().email().required().min(10),
    password: Joi.string().min(6),
  }),
};
