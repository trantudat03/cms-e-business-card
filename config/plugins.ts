module.exports = ({ env }) => ({
  upload: {
    // config: {
    //   providerOptions: {
    //     localServer: {
    //       maxage: 300000, // Đặt thời gian cache tối đa là 5 phút
    //     },
    //   },
    //   sizeLimit: 250 * 1024 * 1024, // Giới hạn kích thước tệp tối đa là 250MB
    // },
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME", "dtfrotdax"),
        api_key: env("CLOUDINARY_KEY", "188385232158984"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET", "yourDefaultSecretHere"),
    },
  },
});
