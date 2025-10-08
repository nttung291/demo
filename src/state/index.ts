import AsyncStorage from "@react-native-async-storage/async-storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import reducers from "./reducers";
import {
  authApiMiddlewares,
  appApiMiddlewares,
  pokemonApiMiddlewares,
  serviceReducer,
} from "@services";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [],
};

const rootReducer = combineReducers({
  ...reducers,
  ...serviceReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 128,
      },
      immutableCheck: false,
    }).concat([...authApiMiddlewares, ...appApiMiddlewares, ...pokemonApiMiddlewares]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export * from './reducers'
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
