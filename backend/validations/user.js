import joi from "joi";

const signupSchema = joi.object({
  firstName: joi.string().min(1).required(),
  lastName: joi.string().min(1).required(),
  email: joi
    .string()
    .email()
    .min(3)
    .required()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  password: joi.string().min(3).required(),
});

const loginSchema = joi.object({
  email: joi
    .string()
    .email()
    .min(3)
    .required()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  password: joi.string().min(3).required(),
});

export { signupSchema, loginSchema };
