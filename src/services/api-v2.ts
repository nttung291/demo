import {
  CryptocurrencyQuotesResponse,
  CryptocurrencyQuotesRequest,
} from "./types";
import { getBaseQuery, getPrepareHeaders } from "./service-layer/query-layer";
import { HTTPS_BASE_URL } from "./config";
import { createApi } from "@reduxjs/toolkit/query/react";
import { TokenPrice } from "@types";
import _get from "lodash/get";

export const tokenV2Api = createApi({
  reducerPath: "tokenV2Api",
  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: getBaseQuery({
    baseUrl: `${HTTPS_BASE_URL}/v2/`,
    prepareHeaders: (headers) => getPrepareHeaders(headers),
  }),
  endpoints: ({ query }) => ({
    getV2CryptocurrencyQuotes: query<
      CryptocurrencyQuotesResponse,
      CryptocurrencyQuotesRequest
    >({
      query: ({ id }) => ({
        url: `cryptocurrency/quotes/latest`,
        params: {
          id: id,
        },
        // params: {
        //   slug: slug,
        // },
      }),
      transformResponse: (response: { data: Record<string, TokenPrice> }) =>
        response.data,
    }),
  }),
});

export const { useGetV2CryptocurrencyQuotesQuery } = tokenV2Api;

export default {
  [tokenV2Api.reducerPath]: tokenV2Api.reducer,
};

export const tokenV2ApiMiddlewares = [tokenV2Api.middleware];

export const tokenV2ApiReducerPaths = [tokenV2Api.reducerPath];
