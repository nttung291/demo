import {
  GamesResponse,
} from "./types";
import { getBaseQuery, getPrepareHeaders } from "./service-layer/query-layer";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HTTPS_BASE_URL } from "./config";
import _get from "lodash/get";

export const tokenV1Api = createApi({
  reducerPath: "tokenV1Api",
  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: getBaseQuery({
    baseUrl: `${HTTPS_BASE_URL}/`,
    prepareHeaders: (headers) => getPrepareHeaders(headers),
  }),
  endpoints: ({ query }) => ({
    getGames: query<
      GamesResponse,
      {}
    >({
      query: ({}) => ({
        url: `games?slug=dino-runner-3d`,
      }),
      transformResponse: (response: { data: GamesResponse}) => response.data,
    }),
  }),
});

export const {
  useGetGamesQuery,
} = tokenV1Api;

export default {
  [tokenV1Api.reducerPath]: tokenV1Api.reducer,
};

export const tokenV1ApiMiddlewares = [tokenV1Api.middleware];

export const tokenV1ApiReducerPaths = [tokenV1Api.reducerPath];
