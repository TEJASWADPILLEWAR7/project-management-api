import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

export const validate = (req, res, next) => {
  const erros = validationResult(req);
  if (erros.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  erros.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  console.log(extractedErrors);
  throw new ApiError(409, "Recived data is not valid", extractedErrors);
};
