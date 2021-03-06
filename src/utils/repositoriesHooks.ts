import { changeSelectedLanguage, getLanguageStats } from "../store/menuBarSlice";
import { useDispatch } from "./reactReduxHooks";
import { Languages } from "../models/repositoryModel";

export const useChangeSelectedLanguage = () => {
	const dispatch = useDispatch();

	return (language: Languages) => {
		dispatch(getLanguageStats(language)).then(() => {
			dispatch(changeSelectedLanguage(language));
		});
	};
};
