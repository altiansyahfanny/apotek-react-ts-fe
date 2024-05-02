import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthStateType = {
	accessToken: string | null;
};

const initialState: AuthStateType = {
	accessToken: null,
};

export const AuthSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<{ value: Partial<AuthStateType> }>) => {
			state = { ...state, ...action.payload.value };
		},
		setAccessToken: (state, action: PayloadAction<{ value: string | null }>) => {
			state.accessToken = action.payload.value;
		},
	},
});

export default AuthSlice;

// export const getAccessToken = (state) => state.auth.accessToken
export const { setState, setAccessToken } = AuthSlice.actions;
