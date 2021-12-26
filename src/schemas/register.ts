import Joi from "joi";

export const registerDealSchema = Joi.object().keys(
  {
    origin: Joi.string().optional(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    utm_source: Joi.string().optional(),
    storeName: Joi.string().required(),
    product: Joi.string().valid('prueba').required()
  }
)