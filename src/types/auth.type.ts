export type LoginRequest = {
	email: string;
	password: string;
};
export type LoginResponse = {
	message: string;
	access_token: string;
};

export type ResetPasswordRequest = {
	token: string;
	password: string;
};

export type RegisterRequest = {
	name: string;
	email: string;
	password: string;
};
