// import { takeEvery, call, put } from 'redux-saga/effects'
// import { PayloadAction } from '@reduxjs/toolkit'
// import authService from '../../services/authService'
// import { setAuth } from '../reducers/authReducer' // import the setAuth action

// interface LoginPayload {
//     username: string
//     password: string
// }

// function* handleLoginRequest(
//     action: PayloadAction<LoginPayload>
// ): Generator<any, void, any> {
//     try {
//         const response = yield call(authService.login, action.payload)
//         yield put(setAuth({ token: response.data.token })) // dispatch the setAuth action
//     } catch (error) {
//         yield put({ type: 'LOGIN_FAILURE', payload: error })
//     }
// }

// function* watchLoginRequest() {
//     yield takeEvery('LOGIN_REQUEST', handleLoginRequest)
// }

// export default watchLoginRequest

import { put, takeLatest, call } from 'redux-saga/effects'

import { loginSuccess, loginFailure } from '../reducers/authReducer'

import { push } from 'connected-react-router'

import { setAuth } from '../reducers/authReducer'
import { login } from '../../services/authService'

interface LoginAction {
    type: string
    payload: {
        email: string
        password: string
    }
}

// function* handleLoginRequest(action: LoginAction) {
//     const response: { token: string } = yield call(login, action.payload)
//     console.log(response.token) // Log the token in the console
//     yield put(setAuth({ token: response.token }))
//     yield put(push('/')) // Redirect to the '/' route
// }

// export function* watchLoginRequest() {
//     yield takeEvery('LOGIN_REQUEST', handleLoginRequest)
// }
// 
// 

function* loginUserSaga(action: LoginAction) {
    try {
        const response : { token: string } = yield call(
            login,
            action.payload.email,
            action.payload.password
        )
        yield put(loginSuccess(response.token))
    } catch (error) {
        yield put(loginFailure(error))
    }
}

export function* watchLoginUser() {
    yield takeLatest('LOGIN_REQUEST', loginUserSaga);
}
export default watchLoginUser
