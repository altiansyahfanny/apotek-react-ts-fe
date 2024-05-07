import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AlertType = {
	error: boolean;
	message: string;
	description: string;
};

type AuthStateType = {
	accessToken: string | null;
	alert: null | AlertType;
};

const initialState: AuthStateType = {
	accessToken: null,
	alert: null,
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

		setAlert: (state, action: PayloadAction<{ value: null | AlertType }>) => {
			state.alert = action.payload.value;
		},
	},
});

export default AuthSlice;

// export const getAccessToken = (state) => state.auth.accessToken
export const { setState, setAccessToken, setAlert } = AuthSlice.actions;
