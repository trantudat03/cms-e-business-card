module.exports = ({ env }) => ({
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000, // Đặt thời gian cache tối đa là 5 phút
        },
      },
      sizeLimit: 250 * 1024 * 1024, // Giới hạn kích thước tệp tối đa là 250MB
    },
  },
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET", "yourDefaultSecretHere"),
    },
  },
});
