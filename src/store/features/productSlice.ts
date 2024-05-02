import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PaginationType } from '../../types/table.type';
import { ProductType } from '../../types/product.types';
import { SorterResult } from 'antd/es/table/interface';

type ProductStateType = {
	paginationState: PaginationType;
	sorterState: object;
	filterState: Record<keyof ProductType, string | number>;
};

const initialState: ProductStateType = {
	paginationState: {
		page: 1,
		pageSize: 10,
		total: 100,
	},
	sorterState: {},
	filterState: { age: '', name: '', date: '', hobbie: '' },
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
			action: PayloadAction<{ value: Partial<SorterResult<ProductType>> }>
		) => {
			state.sorterState = { ...action.payload.value };
		},
		setFilterState: (
			state,
			action: PayloadAction<{ key: keyof ProductType; value: string | number }>
		) => {
			state.filterState = { ...state.filterState, [action.payload.key]: action.payload.value };
		},
	},
});

export default ProductSlice;

export const { setPaginationState, setSorterState, setFilterState } = ProductSlice.actions;
