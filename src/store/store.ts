import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './features/userSlice';
import ProductSlice from './features/productSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import AuthSlice from './features/authSlice';
import { apiSlice } from '../services/api';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: AuthSlice.reducer,
		user: UserSlice.reducer,
		product: ProductSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
