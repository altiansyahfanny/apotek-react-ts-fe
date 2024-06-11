type PagingType = {
	total: number;
	pageSize: number;
	page: number;
	sort: {
		direction: 'asc' | 'desc';
		column: string;
	};
};

type ErrorResponseType = {
	errors?: string;
};

type ApiResponse<T> = {
	data: T;
	paging?: PagingType;
	errors?: string;
};
