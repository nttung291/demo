import authApi from "./authApi";
import appApi from "./appApi";
export * from "./authApi";
export * from "./appApi";

export const serviceReducer = {
  ...authApi,
  ...appApi,
};
