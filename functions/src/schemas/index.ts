import * as Joi from "joi";

export const paletteSchema = Joi.object({
  name: Joi.string().max(55),
  colors: Joi.array().max(49).items(Joi.string().max(7))
})
