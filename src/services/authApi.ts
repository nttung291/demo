import { getBaseQuery, getPrepareHeaders } from "./service-layer/query-layer";
import { createApi } from "@reduxjs/toolkit/query/react";
import { CLIENT_ID, CLIENT_SECRET, AUTH_HTTPS_BASE_URL } from "./config";
import {
  LoginRequest,
  LoginResponse,
} from "@types";

export const authApi = createApi({
  reducerPath: "authApi",
  keepUnusedDataFor: 0,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: getBaseQuery({
    baseUrl: `${AUTH_HTTPS_BASE_URL}/`,
    prepareHeaders: (headers) => getPrepareHeaders(headers, true),
  }, true),
  endpoints: ({ mutation }) => ({
    login: mutation<LoginResponse, LoginRequest>({
      query: (params) => ({
        url: "oauth2/token",
        method: "POST",
        body: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "password",
          scope: "openid",
          username: params.username,
          password: params.password
        }
      })
    })
  }),
});

export const {
  useLoginMutation,
} = authApi;

export default {
  [authApi.reducerPath]: authApi.reducer,
};

export const authApiMiddlewares = [authApi.middleware];

