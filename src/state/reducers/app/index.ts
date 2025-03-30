import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  version: string;
  isAuthenticated?: boolean
};

const initialState: AppState = {
  version: '1.0',
  isAuthenticated: undefined,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setVersion(state: AppState, {payload}: PayloadAction<string>) {
      state.version = payload;
    },
    setAuthenticated(state: AppState, {payload}: PayloadAction<boolean>) {
      state.isAuthenticated = payload;
    },
  },
});

export const { setVersion, setAuthenticated } = appSlice.actions;

export default appSlice.reducer;
