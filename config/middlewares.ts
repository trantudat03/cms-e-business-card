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
  {
    name: "strapi::body",
    config: {
      formLimit: "256mb", // modify form body
      jsonLimit: "256mb", // modify JSON body
      textLimit: "256mb", // modify text body
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
