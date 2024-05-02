import { convertToQueryString } from '../helpers/QueryHelper';
import { ParamsType, ResposeType } from '../types/query.type';
import { UserType } from '../types/user.type';
import api from './api';

type UserResponseType = ResposeType & {
	data: UserType[];
};

export const getUser = async (params: ParamsType<UserType>) => {
	const response = await api.get(`/user?${convertToQueryString(params)}`);
	return response.data as UserResponseType;
};

export const getUserById = async (id: number) => {
	const response = await api.get(`/user/${id}`);
	return response.data as UserType;
};

export const addUser = async (user: UserType) => {
	return await api.post('/user', user);
};

export const updateUser = async (id: number, user: UserType) => {
	return await api.patch(`/user/${id}`, user);
};

export const deleteUser = async (id: number) => {
	return await api.delete(`/user/${id}`);
};
