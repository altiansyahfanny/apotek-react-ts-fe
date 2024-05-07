import { z } from 'zod';

export const LOGIN_SCHEMA = {
	email: z.string().email(),
	password: z.string().min(1),
};

export const REGISTER_SCHEMA = {
	name: z.string().min(5),
	email: z.string().email().min(5),
	password: z.string().min(5),
};
