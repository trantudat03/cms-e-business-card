import jwt, { SignOptions } from "jsonwebtoken";
import _ from "lodash";
import { ENV_CONFIG } from "../constants/config";

export class JwtHelper {
  static issueRefreshToken(payload, jwtOptions: SignOptions) {
    return jwt.sign(
      _.clone(payload.toJSON ? payload.toJSON() : payload),
      ENV_CONFIG.systemConfig.jwt.refreshSecret!,
      jwtOptions
    );
  }

  static verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        ENV_CONFIG.systemConfig.jwt.refreshSecret!,
        {},
        (err, tokenPayload = {}) => {
          if (err) {
            return reject(new Error("Invalid token."));
          }
          resolve(tokenPayload);
        }
      );
    });
  }
}
