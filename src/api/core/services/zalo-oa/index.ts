import axios, { AxiosInstance } from "axios";
import { ZaloInfoResponse } from "./type";

class ZaloOaService {
  private oauthInstance: AxiosInstance;
  private oaInstance: AxiosInstance;
  private graphInstance: AxiosInstance;

  async getZaloUserInfo(
    userAccessToken: string,
    token: string,
    locationCode: string
  ) {
    const config = {
      headers: {
        access_token: userAccessToken,
        code: token,
        secret_key: process.env.ZALO_APP_SECRET_KEY,
      },
      requestId: locationCode,
    };
    try {
      const res = await this.graphInstance
        .get<ZaloInfoResponse>("/v2.0/me/info", config)
        .then((res) => {
          if (res.data?.error != 0) {
            return Promise.reject(res.data);
          }
          return res;
        });

      return res.data;
    } catch (error: any) {
      strapi.log.error(
        `[ZALO - checkDuplication] ${error?.message} params: ${JSON.stringify(config)}`
      );

      if (axios.isAxiosError(error)) {
        strapi.log.error(
          `[ZALO - checkDuplication] error response: ${JSON.stringify(error?.response?.data || {})} params: ${JSON.stringify(config)}`
        );
        return Promise.reject(error?.response?.data);
      }

      return Promise.reject(error);
    }
  }
}

export const zaloOaService = new ZaloOaService();
