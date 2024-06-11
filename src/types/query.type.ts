type MetaType = {
	total: number;
	pageSize: number;
	page: number;
	sort: {
		direction: 'asc' | 'desc';
		column: string;
	};
};

export type ParamsType<T> = {
	page: number;
	pageSize: number;
	filter?: Record<keyof T, string | number | undefined>;
	sort?: object;
};

export type ResposeType = {
	paging: MetaType;
};
