import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { getKeychainItem, StorageKey } from "@helpers";

export const getBaseQuery =
  (_args: FetchBaseQueryArgs, isAuth = false) =>
  async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: FetchBaseQueryError | Record<string, unknown> = {}
  ) => {
    const baseQuery = fetchBaseQuery(_args);
    if (isAuth && typeof args === 'object' && typeof args.body === 'object' && args.body) {
      // If args has a body object, convert it to URLSearchParams
      const newArgs = {
        ...args,
        body: new URLSearchParams(args.body).toString()
      };
      return await baseQuery(newArgs, api, extraOptions);
    }
    return await baseQuery(args, api, extraOptions);
  };

export const getPrepareHeaders = async (headers: Headers, isAuth = false) => {
  try {
    if (isAuth) {
      headers.set("content-type", "application/x-www-form-urlencoded");
    } else {
      headers.set("content-type", "application/json");
      const { accessToken, orgToken } = await getKeychainItem()
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      if (orgToken) {
        headers.set("'org-token:", `${orgToken}`);
      }
    }
  } catch (e) {
    return headers;
  }
  return headers;
};
