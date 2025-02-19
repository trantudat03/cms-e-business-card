module.exports = [
  {
    method: "POST",
    path: "/customer-func/get-zalo-user-info",
    handler: "customer-func.getZaloUserInfo",
    config: {
      auth: false, // Tùy chọn cấu hình quyền truy cập
    },
  },
];
