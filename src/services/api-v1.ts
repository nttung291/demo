import {
  CryptocurrencyListingsResponse,
  CryptocurrencyListingsRequest,
} from "./types";
import { getBaseQuery, getPrepareHeaders } from "./service-layer/query-layer";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Token } from "@types";
import { HTTPS_BASE_URL } from "./config";
import _get from "lodash/get";

export const tokenV1Api = createApi({
  reducerPath: "tokenV1Api",
  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: getBaseQuery({
    baseUrl: `${HTTPS_BASE_URL}/v1/`,
    prepareHeaders: (headers) => getPrepareHeaders(headers),
  }),
  endpoints: ({ query }) => ({
    getV1CryptocurrencyListings: query<
      CryptocurrencyListingsResponse,
      CryptocurrencyListingsRequest
    >({
      query: ({ start, limit }) => ({
        url: `cryptocurrency/listings/latest`,
        params: {
          start,
          limit,
        },
      }),
      transformResponse: (response: { data: Token[] }) => response.data,
    }),
  }),
});

export const {
  useGetV1CryptocurrencyListingsQuery,
  useLazyGetV1CryptocurrencyListingsQuery,
} = tokenV1Api;

export default {
  [tokenV1Api.reducerPath]: tokenV1Api.reducer,
};

export const tokenV1ApiMiddlewares = [tokenV1Api.middleware];

export const tokenV1ApiReducerPaths = [tokenV1Api.reducerPath];
