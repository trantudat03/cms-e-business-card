import { ulid } from "ulid";

export class UtilsHelper {
  static hasQueryParams(url) {
    // Create a new URL object
    const parsedUrl = new URL(url);

    // Check if the search property is not empty
    return parsedUrl.search !== "";
  }
  static formatMessage(template: string, object: any) {
    return template.replace(/{{(\w+)}}/g, (_, key) => object[key]);
  }

  static removeEmptyFields<T>(object: T, keys?: Array<keyof T>): T {
    return Object.entries(object as any).reduce((acc, [key, value]) => {
      const isValidKey = keys?.length ? keys.includes(key as keyof T) : true;
      if (
        isValidKey &&
        (value === "" || value === null || value === undefined)
      ) {
        return acc;
      }

      acc[key] = value;

      return acc;
    }, {}) as T;
  }

  static generateRandomString(length: number) {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static generateUniqueUsernameString() {
    return ulid();
  }
}
