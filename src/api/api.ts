import axios from 'axios';
import { store } from '../store/store';
import { BASE_URL } from '../config';

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

api.interceptors.request.use(
	(config) => {
		const token = store.getState().auth.accessToken;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api;
