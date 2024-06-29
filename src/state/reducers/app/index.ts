import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
  version: string;
};

const initialState: AppState = {
  version: '1.0',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setVersion(state: AppState, {payload}: PayloadAction<string>) {
      state.version = payload;
    },
  },
});

export const { setVersion } = appSlice.actions;

export default appSlice.reducer;
