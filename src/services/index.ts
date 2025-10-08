import authApi from "./authApi";
import appApiReducer from "./appApi";
import pokemonApiReducer from "./pokemonApi";
export * from "./authApi";
export * from "./appApi";
export * from "./pokemonApi";

// Export the API middlewares
import { appApi } from "./appApi";
import { pokemonApi } from "./pokemonApi";
export const appApiMiddlewares = [appApi.middleware];
export const pokemonApiMiddlewares = [pokemonApi.middleware];

export const serviceReducer = {
  ...authApi,
  ...appApiReducer,
  ...pokemonApiReducer,
};
