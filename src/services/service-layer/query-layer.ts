import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { APP_API_KEY } from "../config";

export const getBaseQuery =
  (_args: FetchBaseQueryArgs) =>
  async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: FetchBaseQueryError | Record<string, unknown> = {}
  ) => {
    const baseQuery = fetchBaseQuery(_args);
    const response = await baseQuery(args, api, extraOptions);
    return response;
  };

export const getPrepareHeaders = async (headers: Headers) => {
  try {
    // headers.set("X-CMC_PRO_API_KEY", APP_API_KEY);
    headers.set("content-type", "application/json");
  } catch (e) {
    return headers;
  }
  return headers;
};
