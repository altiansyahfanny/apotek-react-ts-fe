type responseType = {
	meta: { total: number; page: number; pageSize: number };
	data: object | object[];
};

export const transformResponse = (response: responseType) => {
	console.log('response : ', response);
};
