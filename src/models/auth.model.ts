type LoginRequest = {
	email: string;
	password: string;
};

type ForgotPasswordRequest = {
	email: string;
};

type RegisterRequest = {
	email: string;
	name: string;
	password: string;
};
