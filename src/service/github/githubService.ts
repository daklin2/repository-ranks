import axiosInstance from "../axiosInstance";
import { Languages } from "../../models/repositoryModel";

export const getTopRepositoriesByLanguage = (language: Languages) => {
	return axiosInstance.get("search/repositories", {
		params: {
			q: `stars:>1, ${language}`,
			sort: "stars",
			order: "desc",
			type: "Repositories",
		},
	});
};
