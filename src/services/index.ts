import tokenV1Api from "./api-v1";
import tokenV2Api from "./api-v2";

export * from "./api-v1";
export * from "./api-v2";

export const serviceReducer = {
  ...tokenV1Api,
  ...tokenV2Api,
};
