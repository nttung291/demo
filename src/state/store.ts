import AsyncStorage from "@react-native-async-storage/async-storage";
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
  tokenV1ApiMiddlewares,
  tokenV2ApiMiddlewares,
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
    }).concat(...[...tokenV1ApiMiddlewares, ...tokenV2ApiMiddlewares]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
