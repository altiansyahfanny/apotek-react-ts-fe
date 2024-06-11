// import { apiSlice } from '../../app/api/apiSlice';

import { UserType } from '../types/user.type';
import { apiSlice } from './api';

export const UserApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<ApiResponse<UserType[]>, void>({
			query: () => '/user',
			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					console.log('useGetUsersQuery -> success : ', result.data.paging);

					// dispatch(logOut());
				} catch (err) {
					console.log('useGetUsersQuery -> error : ', err);
				}
			},
			providesTags: ['User'],
		}),
		addUser: builder.mutation<any, Omit<UserType, 'id'>>({
			query: (user) => ({
				url: '/user',
				method: 'POST',
				body: user,
			}),
			invalidatesTags: ['User'],
		}),
		getUser: builder.query<any, number>({
			query: (id) => `/user/${id}`,
			providesTags: ['User'],
		}),
		getUserProfile: builder.query<UserType, void>({
			query: () => `/user/get/profile`,
			// providesTags: ['User'],
		}),
	}),
});

export const { useGetUsersQuery, useAddUserMutation, useGetUserQuery, useGetUserProfileQuery } =
	UserApiSlice;
