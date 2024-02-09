import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: null | { email: string; password: string };
    error: null | string;
    toke

}

const initialState: AuthState = {
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state, action: PayloadAction<{ email: string; password: string }>) => {
            state.user = action.payload;
        },
        loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.user = null;
            state.error = action.payload;
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;