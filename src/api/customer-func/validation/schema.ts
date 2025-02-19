import joiDate from "@joi/date";
import dayjs from "dayjs";
import JoiImport from "joi";
const Joi = JoiImport.extend(joiDate) as typeof JoiImport;

export const checkDuplicationSchema = Joi.object({
  zaloName: Joi.string().allow("").optional(),
  zaloIdByOA: Joi.string().required(),
  zaloIdByApp: Joi.string().required(),
  coordinate: Joi.object({
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
  }).optional(), // This field is not used anymore
  phoneNumber: Joi.string().required(),
  locationCode: Joi.string().required(),
  zaloDeviceId: Joi.string().allow("").optional(),
  checksum: Joi.string().allow("").optional(),
});

export const checkDuplicationForOnlineAcquisitionSchema = Joi.object({
  zaloName: Joi.string().allow("").optional(),
  zaloIdByOA: Joi.string().required(),
  zaloIdByApp: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  bypassSfmc: Joi.boolean(),
  campaignId: Joi.number().required(),
  zaloDeviceId: Joi.string().allow("").optional(),
});

export const onlineAcquisitionSchema = Joi.object({
  sessionUUID: Joi.string().required(),
  zaloIdByOA: Joi.string().required(),
  firstName: Joi.string(),
  email: Joi.string(),
  province: Joi.string().allow("").optional(),
  provinceId: Joi.string().allow("").optional(),
  district: Joi.string().allow("").optional(),
  districtId: Joi.string().allow("").optional(),
  campaignId: Joi.number().required(),
  dob: Joi.string().required(),
  typeDob: Joi.string().valid("Pregnancy", "Delivered").required(),
});

// TODO: remove old version
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

export const updateUserSchema = Joi.object({
  firstName: Joi.string().allow("").optional(), // TODO: remove allow empty it
  lastName: Joi.string().allow("").optional(),
  province: Joi.string().allow("").optional(),
  district: Joi.string().allow("").optional(),
  child: Joi.object({
    id: Joi.number().optional(),
    name: Joi.string().allow("").optional(),
    nickname: Joi.string().optional(),
    dob: Joi.string().optional(),
    typeDob: Joi.string().optional(),
    gender: Joi.string().optional(),
  }),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
  testExpireToken: Joi.boolean().optional(), // TODO: remove after testing
});
