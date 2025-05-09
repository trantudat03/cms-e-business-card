export type AuthUserRequestBody = {
  phoneNumberToken: string;
  phoneNumber: string;
  zaloAccessToken: string;
  zaloIdByOA: string;
  zaloIdByApp: string;
  zaloName: string;
  byPassAuth?: boolean; // TODO: remove me
  testExpireToken?: boolean;
};

export type RefreshTokenRequestBody = {
  refreshToken: string;
  testExpireToken?: boolean; // TODO: remove me
};

export type UpdateCardRequestBody = {
  documentId: string;
  name: string;
  company: string;
  position: string;
  phone: string;
  slogan: string;
  socialMedia: [];
  id: string;
  email: string;
  changeAvatar?: boolean;
  useZaloAvatar?: boolean;
  themeID: string;
  avatar: string;
};
