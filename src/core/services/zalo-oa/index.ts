import axios, { AxiosInstance } from "axios";

import { ZaloInfoResponse } from "./type";
import * as crypto from "crypto";

import * as ZMP from "zmp-openapi-nodejs";

class ZaloOaService {
  private oauthInstance: AxiosInstance;
  private oaInstance: AxiosInstance;
  private graphInstance: AxiosInstance;

  constructor() {
    this.oauthInstance = axios.create({
      baseURL: "https://oauth.zaloapp.com",
    });

    this.oaInstance = axios.create({
      baseURL: "https://openapi.zalo.me",
    });

    this.graphInstance = axios.create({
      baseURL: "https://graph.zalo.me",
    });

    // this.initInterceptor();
  }

  //   initInterceptor() {
  //     this.graphInstance.interceptors.request.use((config) => {
  //       config.metadata = {
  //         ...(config?.metadata ?? {}),
  //         requestStart: new Date(),
  //       };

  //       return config;
  //     });

  //     this.graphInstance.interceptors.response.use(
  //       (response) => {
  //         const { config } = response;
  //         const method = config.method?.toUpperCase();

  //         config.metadata = {
  //           ...(config?.metadata ?? {}),
  //           requestEnd: new Date(),
  //         };

  //         const duration =
  //           (config.metadata?.requestStart?.getTime() ?? 0) -
  //           (config.metadata?.requestEnd?.getTime() ?? 0);

  //         strapi.log.info(
  //           `[TrackResponseTime] [ZALO GRAPH] ${config?.requestId ?? "UnknownID"} ${method}:${response.status}:{${config.url}}:${duration}ms`
  //         );

  //         return response;
  //       },
  //       (error) => {
  //         let message = `Failed to call with error ${error?.message}`;

  //         if (axios.isAxiosError(error)) {
  //           const response = error?.response;
  //           const config = error?.config;

  //           if (config) {
  //             error.config!.metadata = {
  //               ...(config?.metadata ?? {}),
  //               requestEnd: new Date(),
  //             };
  //           }

  //           const method = config?.method?.toUpperCase();
  //           const duration =
  //             (config?.metadata?.requestEnd?.getTime() ?? 0) -
  //             (config?.metadata?.requestStart?.getTime() ?? 0);

  //           message = `${method}:${response?.status}:{${config?.url}}:${duration}ms`;
  //         }

  //         strapi.log.error(
  //           `[ZALO GRAPH] ${error?.config?.requestId ?? "UnknownID"} ${message}`
  //         );

  //         return Promise.reject(error);
  //       }
  //     );
  //   }

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
  hash(accessToken) {
    const hash = crypto.createHmac("sha256", process.env.ZALO_APP_SECRET_KEY!);
    hash.update(accessToken);
    return hash.digest("hex");
  }

  async authByAccessToken(accessToken: string, oaId: string) {
    try {
      // const miniappId = (
      //   (await strapi.entityService.findMany("api::zns-system.zns-system", {
      //     fields: ["MiniAppId"],
      //     limit: 1,
      //   })) as any
      // )?.MiniAppId;

      // if (!miniappId) {
      //   throw new ApplicationError("Mini App Id was not set.");
      // }

      const config = {
        headers: {
          access_token: accessToken,
        },
      };

      const res = await this.graphInstance.get<ZaloInfoResponse>(
        "/v2.0/me",
        config
      );

      if (res.data?.error != 0) {
        return Promise.reject(res.data);
      }

      return {
        success: true,
        id: res.data.id,
        name: res.data.name,
        // idByOa: res.data.user_id_by_oa || undefined,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
      };
    }
  }

  async auth(accessToken: string, phoneToken: string, id: string) {
    try {
      const userInfo = await this.authByAccessToken(accessToken, "");

      if (!userInfo.success) {
        return {
          success: false,
        };
      }

      const res = await this.getZaloUserInfo(
        accessToken,
        phoneToken,
        `App-${id}`
      );

      if (res?.error != 0) {
        return Promise.reject(res);
      }

      return {
        success: true,
        number: res.data?.number,
        name: userInfo.name,
        // idByOa: userInfo.idByOa,
        id: userInfo.id,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}

export const zaloOaService = new ZaloOaService();
