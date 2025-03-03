import JoiImport from "joi";
import joiDate from "@joi/date";
const Joi = JoiImport.extend(joiDate) as typeof JoiImport;
export const authUserSchema = Joi.object({
  zaloIdByOA: Joi.string().allow("").optional(),
  zaloAccessToken: Joi.string().optional(),
  phoneNumberToken: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  zaloIdByApp: Joi.string().allow("").optional(),
  zaloName: Joi.string().allow("").optional(),
  byPassAuth: Joi.boolean().optional(),
  testExpireToken: Joi.boolean().optional(),
});
