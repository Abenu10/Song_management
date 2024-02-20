import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    user: any // Specify the user type
    isFetching: boolean
    error: boolean
}

const initialState: AuthState = {
    user: null,
    isFetching: false,
    error: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        postLoginInit: (state) => {},
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action: PayloadAction<any>) => {
            // Specify the user type
            state.isFetching = false
            state.user = action.payload
            state.error = false
        },
        loginFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        registerStart: (state, action) => {
            state.isFetching = true
        },
        registerSuccess: (state, action) => {
            state.isFetching = false
            state.user = action.payload
            state.error = false
        },
        registerFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        verifyToken: (state) => {
            state.isFetching = true
        },
        verifyTokenSuccess: (state, action: PayloadAction<any>) => {
            state.isFetching = false
            state.user = action.payload
            state.error = false
        },
        verifyTokenFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
    },
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    postLoginInit,
    registerStart,
    registerSuccess,
    registerFailure,
    verifyToken,
    verifyTokenSuccess,
    verifyTokenFailure,
} = authSlice.actions

export default authSlice.reducer
