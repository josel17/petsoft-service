import { response } from "express";
import { validationResult } from "express-validator";

const validate = (req, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      data: errors.mapped(),
      message: "Error en los parametros de entrada",
      statuscode: "0x01",
    });
  }
  next();
};

export {
  validate,
};
