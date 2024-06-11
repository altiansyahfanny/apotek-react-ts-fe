import axios, { AxiosResponse } from 'axios';
import { store } from '../store/store';
import { BASE_URL } from '../config';
import { setAccessToken } from '../store/features/authSlice';
import { queryClient } from '../main';

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
	refreshSubscribers.forEach((callback) => callback(token));
	refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
	refreshSubscribers.push(callback);
}

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

api.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error) => {
		const {
			config,
			response: { status },
		} = error;
		const originalRequest = config;

		if (status === 401 && !originalRequest._retry) {
			if (!isRefreshing) {
				isRefreshing = true;

				try {
					const response = await axios.get(`${BASE_URL}/auth/refresh-token`, {
						withCredentials: true,
					});

					const { access_token } = response.data;
					store.dispatch(setAccessToken({ value: access_token }));

					isRefreshing = false;
					onRefreshed(access_token);
					queryClient.clear();
					// console.log('response : ', response);
					// console.log('access_token : ', access_token);
					// queryClient.invalidateQueries({ queryKey: ['product'] });
				} catch (err) {
					isRefreshing = false;
					return Promise.reject(err);
				}
			}

			const retryOriginalRequest = new Promise((resolve) => {
				addRefreshSubscriber((token) => {
					originalRequest._retry = true;
					originalRequest.headers['Authorization'] = `Bearer ${token}`;
					resolve(axios(originalRequest));
				});
			});

			return retryOriginalRequest;
		}

		return Promise.reject(error);
	}
);

export default api;
