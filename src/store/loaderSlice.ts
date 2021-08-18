import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
	isLoading: boolean;
}

const initialState = {
	isLoading: false,
};
export const loaderSlice = createSlice({
	name: "loaderSlice",
	initialState,
	reducers: {
		startLoad: (state) => {
			state.isLoading = true;
		},
		endLoad: (state) => {
			state.isLoading = false;
		},
	},
});

export default loaderSlice.reducer;
export const { startLoad, endLoad } = loaderSlice.actions;
