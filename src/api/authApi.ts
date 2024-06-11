// import axios from 'axios';
import { ResetPasswordRequest } from '../types/auth.type';
import api from './api';

// const api = axios.create({ baseURL: 'http://localhost:5000/api/' });

export const register = async (request: RegisterRequest) => {
	return await api.post('/auth/register', request);
};
export const login = async (props: LoginRequest) => {
	return await api.post('/auth/login', props);
};
export const logout = async () => {
	return await api.post('/auth/logout');
};
export const refreshToken = async () => {
	return await api.get('/auth/refresh-token');
};
export const verification = async (token: string | null) => {
	return await api.get(`/auth/verification?token=${token}`);
};
export const forgotPassword = async (request: { email: string }) => {
	return await api.post(`/auth/forgot-password`, request);
};
export const resetPassword = async (request: ResetPasswordRequest) => {
	return await api.post(`/auth/reset-password`, request);
};
