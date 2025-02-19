import { ServiceUUID } from "../../core/constants/uuid";
import { ApplicationError } from "../../core/types/strapi-utils";
import { Context } from "koa";

const controller = {
  getZaloUserInfo: async (ctx: Context) => {
    try {
      const data = await strapi
        .service(ServiceUUID.CustomerFunc)
        .getZaloUserInfo(ctx.request.body);

      ctx.body = { data };
    } catch (err: any) {
      strapi.log.error(
        `[getZaloUserInfo] ${err?.message} body: ${JSON.stringify(ctx.request.body || {})}`
      );
      if (err instanceof ApplicationError) return Promise.reject(err);
      return Promise.reject(new ApplicationError(err?.message));
    }
  },
};

export default controller;
