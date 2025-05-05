import { log } from "console";
import { ENV_CONFIG } from "../../../core/constants/config";
import { UtilsHelper } from "../../../core/helper/utils";
// import { zaloOaService } from "../../../core/services/zalo-oa";
import { UserJoinFrom, UserRoleId } from "../../../core/types/entity/user";
import { ApplicationError } from "../../../core/types/strapi-utils";
import {
  AuthUserRequestBody,
  RefreshTokenRequestBody,
  UpdateCardRequestBody,
} from "../types/func-customer.request";
import { v4 as uuid } from "uuid";
import { JwtHelper } from "../../../core/helper/jwt";
import card from "../../card/controllers/card";
import { pick } from "lodash";

const messages = {
  locationInvalid: "Vị trí không nằm trong phạm vi cho phép",
  campaignIsNotStart: "CAMPAIGN_NOT_AVAILABLE_MESSAGE",
  duplicatedAcquisition: "DUPLICATE_ACQUISITION_MESSAGE",
  default: "DEFAULT_ERROR_MESSAGE",
  duplicateDevice: "DUPLICATE_DEVICE_MESSAGE",
  typeDobRequire: "Vui lòng chọn giai đoạn thai kỳ",
  dobDeliveredRequire: "Vui lòng chọn ngày sinh của bé",
  dobPregnancyRequire: "Vui lòng chọn ngày dự sinh của bé",
};

export default () => ({
  //   async getZaloUserInfo(data) {
  //     try {
  //       const res = await zaloOaService.getZaloUserInfo(
  //         data.userAccessToken,
  //         data.token,
  //         data.locationCode
  //       );

  //       return res;
  //     } catch (error: any) {
  //       throw new ApplicationError(messages.default, {
  //         error: error?.error,
  //         message: error?.message,
  //       });
  //     }
  //   },
  async authUserWithZalo(data: AuthUserRequestBody) {
    try {
      let phoneNumber = data?.phoneNumber;
      let res: {
        id?: string;
        success?: boolean;
        number?: string;
        name?: string;
        idByOa?: string;
        [key: string]: any;
      };

      let user: any | undefined = undefined;
      let userByPhone: any | undefined = undefined;
      let userByZaloId: any | undefined = undefined;
      let card: any | undefined = undefined;
      let hasLoggedInBefore = false;
      //   if (data.phoneNumberToken) {
      //     const res = await zaloOaService.getZaloUserInfo(
      //       data.zaloAccessToken,
      //       data.phoneNumberToken,
      //       data.zaloName
      //     );
      //     phoneNumber = res.data.number;
      //   }

      if (data.zaloIdByApp) {
        const [firstUser] = await strapi
          .documents("plugin::users-permissions.user")
          .findMany({
            filters: {
              ZaloIdByApp: data.zaloIdByApp,
            },
            populate: {
              theme_cards: {
                populate: {
                  background: true,
                },
              },
            },
            limit: 1,
          });

        user = firstUser;
        userByZaloId = firstUser;
      }
      user = userByZaloId;

      if (!userByZaloId) {
        const [firstUser] = await strapi
          .documents("plugin::users-permissions.user")
          .findMany({
            filters: {
              phoneNumber: phoneNumber,
            },
            populate: {
              theme_cards: {
                populate: {
                  background: true,
                },
              },
            },
            limit: 1,
          });

        user = firstUser;
        userByPhone = firstUser;
      }

      if (user) {
        await strapi.documents("plugin::users-permissions.user").update({
          documentId: user.documentId,
          data: {
            HasLoggedInBefore: true,
            LastInteractiveDate: new Date().toISOString(),
          },
        });
        const [firstCard] = await strapi.documents("api::card.card").findMany({
          filters: {
            user: user.id,
          },
          populate: ["socialMedia", "avatar"],
          limit: 1,
        });
        card = firstCard;
      }

      if (card) {
        const themeCard = await strapi
          .documents("api::theme-card.theme-card")
          .findOne({
            documentId: card?.themeID,
            populate: {
              background: true,
            },
          });
        card.theme = themeCard || null;
      }

      if (!userByZaloId) {
        strapi.log.info(`creating new user, res.idByOa: `);

        const randomUsername = UtilsHelper.generateUniqueUsernameString();
        // 3 User not found -> create new user
        user = await strapi.documents("plugin::users-permissions.user").create({
          data: {
            username: randomUsername,
            name: data.zaloName || randomUsername,
            email: `${randomUsername}@kcc.com`,
            confirmed: true,
            blocked: false,
            role: UserRoleId.Authenticated,
            ZaloIdByOA: data.zaloIdByOA,
            ZaloIdByApp: data.zaloIdByApp,
            phoneNumber: phoneNumber,
            JoinDate: new Date().toISOString(),
            HasLoggedInBefore: true,
            LastInteractiveDate: new Date().toISOString(),
          },
        });

        card = await strapi.documents("api::card.card").create({
          data: {
            name: data.zaloName || randomUsername,
            phone: phoneNumber || "",
            JoinDate: new Date().toISOString(),
            user: user.documentId,
            status: "published",
          },
        });
      }

      if (!user) {
        throw new ApplicationError("Không tìm thấy người dùng");
      }
      const tokenPayload = { id: user?.id, uuid: uuid() };
      return {
        accessToken: strapi
          .plugin("users-permissions")
          .service("jwt")
          .issue(
            tokenPayload,
            data.testExpireToken ? { expiresIn: "1h" } : undefined
          ),
        refreshToken: JwtHelper.issueRefreshToken(tokenPayload, {
          expiresIn: "30d",
        }),
        hasLoggedInBefore,
        user: {
          id: user.documentId,
          ZaloIdByApp: user.ZaloIdByApp,
          phoneNumber: user.phoneNumber,
          username: user.username,
          name: user.name,
          JoinDate: user.JoinDate,
          theme_cards: user.theme_cards,
        },
        card: card,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async refreshToken(data: RefreshTokenRequestBody) {
    const tokenPayload = await JwtHelper.verifyRefreshToken(data.refreshToken);

    const payload = pick(tokenPayload, ["id", "uuid"]);

    return {
      accessToken: strapi
        .plugin("users-permissions")
        .service("jwt")
        .issue(
          payload,
          data.testExpireToken ? { expiresIn: "10s" } : undefined
        ),
      refreshToken: JwtHelper.issueRefreshToken(payload, {
        expiresIn: "30d",
      }),
    };
  },

  async updateCard(userId: number, data: UpdateCardRequestBody) {
    try {
      let card: any | undefined = undefined;
      if (userId) {
        card = await strapi.documents("api::card.card").update({
          documentId: data.documentId,
          data: {
            name: data.name,
            company: data.company,
            email: data.email,
            phone: data.phone,
            slogan: data.slogan,
            socialMedia: data.socialMedia,
            position: data.position,
            themeID: data.themeID,
          },
          populate: ["socialMedia"],
        });
      }
      if (card) {
        const themeCard = await strapi
          .documents("api::theme-card.theme-card")
          .findOne({
            documentId: card?.themeID,
            populate: {
              background: true,
            },
          });
        card.theme = themeCard || null;
      }
      return card;
    } catch (error) {
      return error;
    }
  },
  async getActionCard(userId: number, cardId: string) {
    try {
      let card: any | undefined = undefined;
      let action = "none";
      if (userId) {
        const [firstCard] = await strapi.documents("api::card.card").findMany({
          filters: {
            documentId: cardId,
          },
          populate: ["socialMedia", "avatar", "user"],
          limit: 1,
        });
        card = firstCard;
        if (firstCard) {
          // Kiểm tra nếu userId là chủ sở hữu card
          if (firstCard.user?.id === userId) {
            action = "own";
          } else {
            const [contact] = await strapi
              .documents("api::contact.contact")
              .findMany({
                filters: {
                  users_permissions_user: { id: userId },
                  card: { documentId: cardId },
                },
                limit: 1,
              });

            if (contact) {
              action = "contact";
              card = { ...firstCard, contactId: contact.documentId };
            }
          }
          card.action = action;
          if (firstCard) {
            const themeCard = await strapi
              .documents("api::theme-card.theme-card")
              .findOne({
                documentId: card?.themeID,
                populate: {
                  background: true,
                },
              });
            card.theme = themeCard || null;
          }
        }
      }
      return card;
    } catch (error) {
      return error;
    }
  },

  async getContactByUserId(userId, page, pageSize, searchTerm = "") {
    try {
      if (!userId) return null; // Trả về null nếu không có userId
      const filters: any = {
        users_permissions_user: { id: userId },
      };

      // Nếu có searchTerm, áp dụng lọc theo tên công ty, vị trí hoặc tên người dùng
      if (searchTerm) {
        filters.$or = [
          { card: { company: { $containsi: searchTerm } } },
          { card: { position: { $containsi: searchTerm } } },
          { card: { name: { $containsi: searchTerm } } },
        ];
      }

      const contacts = await strapi.entityService.findMany(
        "api::contact.contact",
        {
          filters,
          populate: {
            card: {
              fields: ["id", "company", "position", "name"],
              populate: {
                user: {
                  fields: [
                    "id",
                    "username",
                    "email",
                    "phoneNumber",
                    "ZaloIdByApp",
                  ],
                },
                avatar: true,
              },
            },
          },
          limit: Number(pageSize), // Giới hạn số bản ghi mỗi trang
          offset: (Number(page) - 1) * Number(pageSize),
        }
      );

      //   strapi.documents(uid).count();

      const total = await strapi.documents("api::contact.contact").count({
        filters,
      });
      const [data] = contacts;
      console.log(data);
      return {
        data: contacts,
        pagination: {
          page: Number(page),
          pageSize: Number(pageSize),
          pageCount: Math.ceil(total / Number(pageSize)),
          total: total,
        },
      };
      return contacts;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw new Error("Unable to fetch contacts");
    }
  },
});
