import { Token, TokenPrice } from "@types";

export type Status = {
  timestamp: Date;
  error_code: number;
  error_message: string;
  elapsed: number;
  credit_count: number;
};

export type CryptocurrencyListingsRequest = {
  start?: number;
  limit?: number;
};

export type CryptocurrencyListingsResponse = Token[];

export type CryptocurrencyQuotesRequest = {
  id?: string;
  slug?: string;
  symbol?: string;
};

export type CryptocurrencyQuotesResponse = Record<string, TokenPrice>;
