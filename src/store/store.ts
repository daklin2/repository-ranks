import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import menuBarSlice from "./menuBarSlice";
import loaderSlice from "./loaderSlice";

export const store = configureStore({
	reducer: {
		languageMenu: menuBarSlice,
		loader: loaderSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
