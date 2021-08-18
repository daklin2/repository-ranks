import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTopRepositoriesByLanguage} from "../service/github/githubService";
import {AppState} from "./store";
import {endLoad, startLoad} from "./loader";
import {Languages, RepositoryModel} from "../models/repositoryModel";

export const getLanguageStats = createAsyncThunk<Array<RepositoryModel>, Languages, { state: AppState }>("menu/getLanguage", async (selectedLanguage, { getState, dispatch, rejectWithValue}) => {
  dispatch(startLoad());

  return await getTopRepositoriesByLanguage(selectedLanguage)
    .then((response) => {
      const parsedData = response.data.items.map((repository: Record<string, any>): RepositoryModel => {
        return {
          login: repository.owner.login,
          avatarUrl: repository.owner.avatar_url,
          repositoryUrl: repository.html_url,
          stars: repository.stargazers_count,
        }
      });
      dispatch(endLoad());

      return parsedData
    })
    .catch((err) => {
      dispatch(endLoad());
      return rejectWithValue(err.response.data);
    });
});

interface initialStateInterface {
  currentLanguage: Languages | null;
  languageInformation?: Array<RepositoryModel>;
  error?: string;
}

const initialState: initialStateInterface = {
  currentLanguage: null,
};

export const languageMenuSlice = createSlice({
  name: "languageMenuSlice",
  initialState,
  reducers: {
    changeSelectedLanguage: (state, { payload }: { payload: Languages}) => {
      console.log(state.languageInformation)
      state.currentLanguage = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLanguageStats.fulfilled, (state, { payload }) => {
      state.languageInformation = payload
    });
    builder.addCase(getLanguageStats.rejected, (state, { payload }) => {
      state.error = payload as any
    });
  }
})

export const { changeSelectedLanguage } = languageMenuSlice.actions;
export default languageMenuSlice.reducer;