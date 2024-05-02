import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/userSlice';
import ProductSlice from './features/productSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import AuthSlice from './features/authSlice';

export const store = configureStore({
	reducer: {
		auth: AuthSlice.reducer,
		user: UserSlice.reducer,
		product: ProductSlice.reducer,
	},
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
