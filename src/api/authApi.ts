// import axios from 'axios';
import api from './api';

// const api = axios.create({ baseURL: 'http://localhost:5000/api/' });

type LoginProps = {
	email: string;
	password: string;
};

type RegisterRequest = {
	name: string;
	email: string;
	password: string;
};

export const register = async (request: RegisterRequest) => {
	return await api.post('/auth/register', request);
};
export const login = async (props: LoginProps) => {
	return await api.post('/auth/login', props);
};
export const logout = async () => {
	return await api.post('/auth/logout');
};
export const refreshToken = async () => {
	return await api.get('/auth/refresh-token');
};
