import axiosInstance from "../axiosInstance";
import { Languages } from "../../models/repositoryModel";

export const getTopRepositoriesByLanguage = (language: Languages) => {
	// https://api.github.com/search/repositories?q=stars:%3e1&sort=stars&order=desc&type=Repositories
	return axiosInstance.get("search/repositories", {
		params: {
			q: `stars:>1, ${language}`,
			sort: "stars",
			order: "desc",
			type: "Repositories",
		},
	});
};
