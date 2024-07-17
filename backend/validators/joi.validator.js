import Joi from "joi";
import { messages, responseStatus, responseCodes } from "../lib/constants.js";

const signUpSchema = Joi.object({
  firstName: Joi.string().trim().min(1),
  lastName: Joi.string().trim().min(1),
  email: Joi.string().trim().min(1).email().required(),
  phoneNumber: Joi.number().required(),
  userType: Joi.string().trim().min(1).required(),
  password: Joi.string().trim().min(1).required(),
  confirmPassword: Joi.string(),
  address: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  zipCode: Joi.string(),
  termsCondition: Joi.boolean(),
});

const signInSchema = Joi.object({
  email: Joi.string().trim().min(1).email().required(),
  password: Joi.string().trim().min(1).required(),
  userType: Joi.string().required(),
});

const validationMiddleware = async (req, res, next, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    whiteSpace: " ",
  };
  if (schema === "signUp") {
    var { error } = signUpSchema.validate(req.body, options);
  }
  if (schema === "signIn") {
    var { error } = signInSchema.validate(req.body, options);
  }
  if (error) {
    let validateErrors = {
      status: responseStatus.failedStatus,
      statusCode: responseCodes.badRequest,
      message: error.details[0].message,
    };
    res.status(responseCodes.badRequest).json(validateErrors);
  } else {
    next();
  }
};

export default validationMiddleware;
