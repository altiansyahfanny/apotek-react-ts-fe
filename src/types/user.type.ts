export type UserType = {
	id: number;
	name: string;
	role: string;
	email: string;
	profilePic: string | null;
};

export type DataSourceType = UserType & {
	key: string;
};
