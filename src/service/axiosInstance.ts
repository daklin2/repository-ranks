import axios from "axios";

const axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_GITHUB_URL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/vnd.github.v3+json",
	},
	timeout: 4000,
});

export default axiosInstance;
