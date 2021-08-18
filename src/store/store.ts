import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import languageMenuSlice from "./languageMenuSlice";
import loaderSlice from "./loader";

export const store = configureStore({
  reducer: {
    languageMenu: languageMenuSlice,
    loader: loaderSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
