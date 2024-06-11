import { convertToQueryString } from '../helpers/QueryHelper';
import { ParamsType, ResposeType } from '../types/query.type';
import { ProductSearchType, ProductType } from '../types/product.type';
import api from './api';

type ProductResponseType = ResposeType & {
	data: ProductType[];
};

export const getProduct = async (params: ParamsType<ProductSearchType>) => {
	const response = await api.get(`/product?${convertToQueryString(params)}`);
	return response.data as ProductResponseType;
};

export const getProductById = async (id: number) => {
	const response = await api.get(`/product/${id}`);
	return response.data as ProductType;
};

export const addProduct = async (product: ProductType) => {
	return await api.post('/product', product);
};

export const updateProduct = async (id: number, product: ProductType) => {
	return await api.patch(`/product/${id}`, product);
};

export const deleteProduct = async (id: number) => {
	return await api.delete(`/product/${id}`);
};

export const getProductProfile = async () => {
	return await api.get(`/product/get/profile`);
};
