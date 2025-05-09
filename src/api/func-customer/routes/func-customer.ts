export default {
  routes: [
    {
      method: "POST",
      path: "/func-customer/get-zalo-user-info",
      handler: "func-customer.getZaloUserInfoC",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/func-customer/test-api",
      handler: "func-customer.testApi",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/func-customer/auth",
      handler: "func-customer.auth",
      config: {
        policies: [],
        middlewares: [],
      },
    },

    {
      method: "POST",
      path: "/func-customer/update-card",
      handler: "func-customer.updateCard",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/func-customer/get-contacts",
      handler: "func-customer.getContactByUserId",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/func-customer/get-action-card",
      handler: "func-customer.getActionCard",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/func-customer/refresh-token",
      handler: "func-customer.refreshToken",
    },
  ],
};
