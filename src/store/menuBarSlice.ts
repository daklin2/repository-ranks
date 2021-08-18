import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTopRepositoriesByLanguage } from "../service/github/githubService";
import { endLoad, startLoad } from "./loaderSlice";
import { Languages, RepositoryModel } from "../models/repositoryModel";

export const getLanguageStats = createAsyncThunk<Array<RepositoryModel>, Languages, { rejectValue: string }>(
	"menuBarSlice/getLanguage",
	async (selectedLanguage, { dispatch, rejectWithValue }) => {
		dispatch(startLoad());

		return await getTopRepositoriesByLanguage(selectedLanguage)
			.then((response) => {
				const parsedData = response.data.items.map(
					(repository: Record<string, any>): RepositoryModel => ({
						login: repository.owner.login,
						avatarUrl: repository.owner.avatar_url,
						repositoryUrl: repository.html_url,
						stars: repository.stargazers_count,
					})
				);

				dispatch(endLoad());
				return parsedData;
			})
			.catch((err) => {
				dispatch(endLoad());
				return rejectWithValue(err.response.data);
			});
	}
);

interface initialStateInterface {
	currentLanguage: Languages | null;
	languageInformation?: Array<RepositoryModel>;
	error?: string;
}

const initialState: initialStateInterface = {
	currentLanguage: null,
};

export const menuBarSlice = createSlice({
	name: "menuBarSlice",
	initialState,
	reducers: {
		changeSelectedLanguage: (state, { payload }: { payload: Languages }) => {
			state.currentLanguage = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getLanguageStats.fulfilled, (state, { payload }) => {
			state.languageInformation = payload;
		});
		builder.addCase(getLanguageStats.rejected, (state, { payload }) => {
			state.error = payload;
		});
	},
});

export const { changeSelectedLanguage } = menuBarSlice.actions;
export default menuBarSlice.reducer;
