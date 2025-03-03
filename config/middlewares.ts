export default [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: false, // Tắt CSP để tránh lỗi CORS
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: "*", // Chấp nhận tất cả domain
      headers: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Cho phép tất cả phương thức HTTP
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
