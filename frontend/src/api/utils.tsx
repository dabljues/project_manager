import { camelCase } from "lodash";

const toCamelCase = (obj: any): object => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  }
  if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: toCamelCase(obj[key]),
      }),
      {}
    );
  }
  return obj;
};

export default toCamelCase;
