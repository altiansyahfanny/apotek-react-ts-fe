import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PaginationType, SorterType } from '../../types/table.type';
import { UserType } from '../../types/user.type';

type ModalType = {
	modalAddIsOpen: boolean;
	modalUpdateIsOpen: boolean;
};

type FilterType = Record<keyof UserType, string | number>;

type UserStateType = {
	modalState: ModalType;
	paginationState: PaginationType;
	sorterState: SorterType<UserType>;
	filterState: FilterType;
};

const initialState: UserStateType = {
	filterState: { id: '', name: '', email: '' },
	paginationState: { page: 1, pageSize: 10, total: 10 },
	sorterState: { sortColumn: 'id', sortDirection: 'desc' },

	modalState: {
		modalAddIsOpen: false,
		modalUpdateIsOpen: false,
	},
};

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setPaginationState: (state, action: PayloadAction<{ value: Partial<PaginationType> }>) => {
			state.paginationState = { ...state.paginationState, ...action.payload.value };
		},
		setSorterState: (state, action: PayloadAction<{ value: SorterType<UserType> }>) => {
			state.sorterState = { ...action.payload.value };
		},
		setFilterState: (state, action: PayloadAction<{ value: Partial<FilterType> }>) => {
			state.filterState = { ...state.filterState, ...action.payload.value };
		},
		setModalState: (state, action: PayloadAction<{ value: Partial<ModalType> }>) => {
			state.modalState = { ...state.modalState, ...action.payload.value };
		},
	},
});

export default UserSlice;

export const { setModalState, setFilterState, setSorterState, setPaginationState } =
	UserSlice.actions;
