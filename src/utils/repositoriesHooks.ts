import {changeSelectedLanguage, getLanguageStats} from "../store/languageMenuSlice";
import {useDispatch} from "./customHooks";
import {Languages} from "../models/repositoryModel";

export const useChangeSelectedLanguage = () => {
  const dispatch = useDispatch();

  return (language: Languages) => {
    dispatch(getLanguageStats(language))
      .then(() => {
        dispatch(changeSelectedLanguage(language))
      })
  }

}