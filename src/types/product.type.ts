export type ProductType = {
	id?: number;
	name: string;
	price: number;
	stock: number;
};

export type ProductSearchType = {
	name: string;
	price: number;
	stock: number;
};

export type DataSourceType = ProductType & {
	key: string;
};
