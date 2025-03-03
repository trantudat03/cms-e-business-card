/**
 * A set of functions called "actions" for `test-controller`
 */
import { ServiceUUID } from "../../../core/constants/uuid";
import { ApplicationError } from "../../../core/types/strapi-utils";
import { Context } from "koa";

export default {
  getZaloUserInfo: async (ctx: Context) => {
    try {
      const data = await strapi
        .service("api::test-controller.test-controller")
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
