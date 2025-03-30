import { getBaseQuery, getPrepareHeaders } from "./service-layer/query-layer";
import { createApi } from "@reduxjs/toolkit/query/react";
import { HTTPS_BASE_URL } from "./config";
import { InvoiceRequest, UserResponse, InvoiceResponse, CreateInvoiceRequest } from "@types";
import { mockedInvoice } from "./mock";

export const appApi = createApi({
  reducerPath: "appApi",
  keepUnusedDataFor: 1,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: getBaseQuery({
    baseUrl: `${HTTPS_BASE_URL}/`,
    prepareHeaders: (headers) => getPrepareHeaders(headers),
  }),
  endpoints: ({ query, mutation }) => ({
    getUser: query<UserResponse, {}>({
      query: () => ({
        url: "membership-service/1.0.0/users/me",
        method: "GET",
      }),
      transformResponse: (response: { data: UserResponse}) => response?.data,
    }),
    getInvoices: query<InvoiceResponse[], InvoiceRequest>({
      query: (params) => ({
        url: "invoice-service/1.0.0/invoices",
        method: "GET",
        params: params
      }),
      transformResponse: (response: { data: InvoiceResponse[]}) => response?.data || [],
    }),
    createInvoice: mutation<InvoiceResponse, CreateInvoiceRequest>({
      query: (body) => ({
        url: "invoice-service/1.0.0/invoices",
        method: "POST",
        body: {...mockedInvoice, ...body},
        headers: {
          'Operation-Mode': 'SYNC'
        }
      }),
      transformResponse: (response: { data: InvoiceResponse}) => response?.data,
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useLazyGetInvoicesQuery,
  useCreateInvoiceMutation,
} = appApi;

export default {
  [appApi.reducerPath]: appApi.reducer,
};

export const appApiMiddlewares = [appApi.middleware];

