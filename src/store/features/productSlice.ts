import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PaginationType } from '../../types/table.type';
import { ProductSearchType } from '../../types/product.type';
import { SorterResult } from 'antd/es/table/interface';

type ProductStateType = {
	paginationState: PaginationType;
	sorterState: object;
	filterState: Record<keyof ProductSearchType, string | number>;
};

const initialState: ProductStateType = {
	paginationState: {
		page: 1,
		pageSize: 1,
		total: 1,
	},
	sorterState: {},
	filterState: { stock: '', name: '', price: '' },
};

export const ProductSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		setPaginationState: (state, action) => {
			state.paginationState = { ...state.paginationState, ...action.payload };
		},
		setSorterState: (
			state,
			action: PayloadAction<{ value: Partial<SorterResult<ProductSearchType>> }>
		) => {
			state.sorterState = { ...action.payload.value };
		},
		setFilterState: (
			state,
			action: PayloadAction<{ key: keyof ProductSearchType; value: string | number }>
		) => {
			state.filterState = { ...state.filterState, [action.payload.key]: action.payload.value };
		},
	},
});

export default ProductSlice;

export const { setPaginationState, setSorterState, setFilterState } = ProductSlice.actions;
