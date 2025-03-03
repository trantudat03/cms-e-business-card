export const ENV_CONFIG = {
  qrCodeSecretKey: process.env.QR_CODE_SECRET_KEY || "xyzkihfwqr",
  locationQrCodeSecretKey:
    process.env.LOCATION_QR_CODE_SECRET_KEY || "kzjnshwtq",
  campaignQrCodeSecretKey:
    process.env.CAMPAIGN_QR_CODE_SECRET_KEY || "dhfjhsadj",
  sfmc: {
    customerBaseUrl:
      process.env.SFMC_BASE_URL ||
      "https://us1.api.kimclark.com/kcc-mkt-consumer-exp-api-uat",
    mktSfmcBaseUrl:
      process.env.MKT_SFMC_BASE_URL ||
      "https://us1.api.kimclark.com/kcc-mkt-sfmc-exp-api-uat",
    clientId: process.env.SFMC_CLIENT_ID,
    clientSecret: process.env.SFMC_CLIENT_SECRET,
  },
  timezone: "Asia/Ho_Chi_Minh",
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!, 10),
    password: process.env.REDIS_PASSWORD,
  },
  featureFlags: {
    bypassZaloAuth: process.env.FLAG_BYPASS_ZALO_AUTH === "true",
  },
  systemConfig: {
    enableCronJob: process.env.ENABLE_CRON_JOBS === "true",
    jwt: {
      refreshSecret: process.env.JWT_REFRESH_SECRET || "e-business-card",
    },
  },
};
