// import { ZaloUserInfoRequestBody } from './../../customer-func/types/customer-func.request';
/**
 * test-controller service
 */

import { zaloOaService } from "../../../core/services/zalo-oa";
import { ApplicationError } from "../../../core/types/strapi-utils";

const messages = {
  locationInvalid: "Vị trí không nằm trong phạm vi cho phép",
  campaignIsNotStart: "CAMPAIGN_NOT_AVAILABLE_MESSAGE",
  duplicatedAcquisition: "DUPLICATE_ACQUISITION_MESSAGE",
  default: "DEFAULT_ERROR_MESSAGE",
  duplicateDevice: "DUPLICATE_DEVICE_MESSAGE",
  typeDobRequire: "Vui lòng chọn giai đoạn thai kỳ",
  dobDeliveredRequire: "Vui lòng chọn ngày sinh của bé",
  dobPregnancyRequire: "Vui lòng chọn ngày dự sinh của bé",
};

export default () => ({
  async getZaloUserInfo(data) {
    try {
      const res = await zaloOaService.getZaloUserInfo(
        data.userAccessToken,
        data.token,
        data.locationCode
      );

      return res;
    } catch (error: any) {
      throw new ApplicationError(messages.default, {
        error: error?.error,
        message: error?.message,
      });
    }
  },
});
