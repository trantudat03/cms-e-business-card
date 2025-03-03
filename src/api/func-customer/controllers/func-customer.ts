import {
  ApplicationError,
  UnauthorizedError,
} from "../../../core/types/strapi-utils";
import { Context } from "koa";
import { authUserSchema } from "../validation/schema";
export default {
  getZaloUserInfoC: async (ctx: Context) => {
    try {
      const data = await strapi
        .service("api::func-customer.func-customer")
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
  auth: async (ctx) => {
    try {
      const body = ctx.request.body;
      const data = await strapi
        .service("api::func-customer.func-customer")
        .authUserWithZalo(body);
      ctx.body = { data };
    } catch (err: any) {
      strapi.log.error(
        `[auth] ${err?.message} body: ${JSON.stringify(ctx.request.body || {})}`
      );
      if (err instanceof ApplicationError) return Promise.reject(err);
      return Promise.reject(new ApplicationError(err?.message));
    }
  },

  updateCard: async (ctx) => {
    try {
      const body = ctx.request.body;
      const data = await strapi
        .service("api::func-customer.func-customer")
        .updateCard(ctx.state.user.id, body);

      ctx.body = {
        data,
        status: "success",
      };
    } catch (err: any) {
      strapi.log.error(
        `[updateUserInfo] ${err?.message} body: ${JSON.stringify(ctx.request.body || {})}`
      );
      if (err instanceof ApplicationError) return Promise.reject(err);
      return Promise.reject(new ApplicationError(err?.message));
    }
  },

  getContactByUserId: async (ctx) => {
    try {
      console.log("chay vao day", ctx);
      const data = await strapi
        .service("api::func-customer.func-customer")
        .getContactByUserId(ctx.state.user.id);

      ctx.body = { data };
    } catch (err: any) {
      strapi.log.error(`[refreshToken] ${err?.message}`);

      return Promise.reject(new UnauthorizedError("Invalid refresh token"));
    }
  },

  getActionCard: async (ctx) => {
    try {
      console.log("chay vao day");

      const body = ctx.request.body;
      console.log(body);
      const data = await strapi
        .service("api::func-customer.func-customer")
        .getActionCard(ctx.state?.user?.id, body.data);

      ctx.body = {
        data,
        status: "success",
      };
    } catch (err: any) {
      strapi.log.error(
        `[updateUserInfo] ${err?.message} body: ${JSON.stringify(ctx.request.body || {})}`
      );
      if (err instanceof ApplicationError) return Promise.reject(err);
      return Promise.reject(new ApplicationError(err?.message));
    }
  },

  refreshToken: async (ctx) => {
    try {
      const body = ctx.request.body;

      const data = await strapi
        .service("api::func-customer.func-customer")
        .refreshToken(body);

      ctx.body = { data };
    } catch (err: any) {
      strapi.log.error(`[refreshToken] ${err?.message}`);

      return Promise.reject(new UnauthorizedError("Invalid refresh token"));
    }
  },
};
