import _ from "lodash";

const toCamelCase = (obj: object): object =>
  _.mapKeys(obj, (_v, k) => _.camelCase(k));

export default toCamelCase;
