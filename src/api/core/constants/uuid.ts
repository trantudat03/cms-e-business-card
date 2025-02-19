export enum EntityServiceUUID {
  Location = "api::location.location",
  Acquisition = "api::acquisition.acquisition",
  ZnsSystem = "api::zns-system.zns-system",
  PromotionCode = "api::promotion-code.promotion-code",
  FeatureFlag = "api::feature-flag.feature-flag",
  PromotionCampaign = "api::promotion-campaign.promotion-campaign",
  Product = "api::product.product",
  Alert = "api::alert.alert",
  ZaloConsultingNewsTemplate = "api::zalo-consulting-news-template.zalo-consulting-news-template",
  AppLog = "api::app-log.app-log",
  BabyName = "api::baby-name.baby-name",
  User = "plugin::users-permissions.user",
  OperationLog = "api::operation-log.operation-log",
  Child = "api::child.child",
  Insight = "api::insight.insight",
  WishCategory = "api::wish-category.wish-category",
  BabyImage = "api::baby-image.baby-image",
  AppSetting = "api::app-setting.app-setting",
}

export enum ServiceUUID {
  Webhook = "api::webhook.webhook",
  Integration = "api::integration.integration",
  CustomerFunc = "api::customer-func.customer-func",
  LocationUtils = "api::location.utils",
  PromotionCodeQueue = "api::promotion-code.queue",
  AcquisitionQueue = "api::acquisition.queue",
  ZnsSystem = "api::zns-system.zns-system",
  ZnsSystemQueue = "api::zns-system.queue",
  BabyNameUtils = "api::baby-name.utils",
  Migration = "api::migration.migration",
  UserMigration = "api::migration.user",
  MigrateUserQueue = "api::acquisition.migrate-user-queue",
  Child = "api::child.child",
  AppSetting = "api::app-setting.app-setting",
  CustomPromotionCampaign = "api::promotion-campaign.custom",
  CustomAcquisition = "api::acquisition.custom",
  PGManagement = "api::pg-management.pg-management",
}
