import axios from 'axios';
import { store } from '../store/store';

const api = axios.create({
	baseURL: 'http://localhost:5000/api/',
	withCredentials: true,
});

api.interceptors.request.use(
	(config) => {
		const token = store.getState().auth.accessToken;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`; // Sisipkan token ke dalam header Authorization
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api;
