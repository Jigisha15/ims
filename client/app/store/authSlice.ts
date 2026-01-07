import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	token: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.token = null;
			state.isAuthenticated = false;
		},
		restoreAuth: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
			state.isAuthenticated = true;
		},
	},
});

export const { loginSuccess, logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
