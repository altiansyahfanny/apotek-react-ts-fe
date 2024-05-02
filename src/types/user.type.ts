export type UserType = {
	id: number;
	name: string;
	// username: string;
	email: string;
};

export type DataSourceType = UserType & {
	key: string;
};
