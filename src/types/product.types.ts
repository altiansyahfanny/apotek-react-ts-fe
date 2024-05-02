export type ProductType = {
	name: string;
	age: number;
	date: string;
	hobbie: string;
};

export type DataSourceType = ProductType & {
	key: string;
};
