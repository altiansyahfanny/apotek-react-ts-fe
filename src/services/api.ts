import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { BASE_URL } from '../config';
import { setAccessToken } from '../store/features/authSlice';
import { RootState } from '../store/store';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.accessToken;

		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: any
) => {
	await mutex.waitForUnlock();

	// console.log(args) // request url, method, body
	// console.log(api) // signal, dispatch, getState()
	// console.log(extraOptions) //custom like {shout: true}

	let result = await baseQuery(args, api, extraOptions);

	// If you want, handle other status codes, too
	if (result?.error?.status === 403) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();

			try {
				console.log('REAUTH...');

				// send refresh token to get new access token
				const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions);

				if (refreshResult?.data) {
					console.log('REAUTH -> SUCCESS...');

					const newRefreshResult = refreshResult.data as { access_token: string };

					// store the new token
					api.dispatch(setAccessToken({ value: newRefreshResult.access_token }));

					// retry original query with new access token
					result = await baseQuery(args, api, extraOptions);
				} else {
					console.log('REAUTH -> ERROR...');

					if (refreshResult?.error?.status === 403) {
						(refreshResult.error.data as any).message = 'Sesi anda telah berakhir';
					}

					return refreshResult;
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User'],
	endpoints: () => ({}),
});
