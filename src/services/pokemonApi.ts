import { getBaseQuery } from "./service-layer/query-layer";
import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@env";

// Define types for our Pokemon data
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  keepUnusedDataFor: 300, // Keep data in cache for 5 minutes
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: getBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, { limit?: number; offset?: number }>({
      query: ({}) => ({
        url: "/pokemon/",
        method: "GET",
      }),
    }),
    getPokemonDetail: builder.query<PokemonDetail, string | number>({
      query: (nameOrId) => ({
        url: `/pokemon/${nameOrId}/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useLazyGetPokemonListQuery,
  useGetPokemonDetailQuery,
  useLazyGetPokemonDetailQuery,
} = pokemonApi;

export default {
  [pokemonApi.reducerPath]: pokemonApi.reducer,
};

export const pokemonApiMiddlewares = [pokemonApi.middleware];
