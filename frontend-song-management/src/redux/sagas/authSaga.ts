import { takeEvery, call, put } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import authService from '../../services/authService'
import { setAuth } from '../reducers/authReducer' // import the setAuth action

interface LoginPayload {
    username: string
    password: string
}

function* handleLoginRequest(
    action: PayloadAction<LoginPayload>
): Generator<any, void, any> {
    try {
        const response = yield call(authService.login, action.payload)
        yield put(setAuth({ token: response.data.token })) // dispatch the setAuth action
    } catch (error) {
        yield put({ type: 'LOGIN_FAILURE', payload: error })
    }
}

function* watchLoginRequest() {
    yield takeEvery('LOGIN_REQUEST', handleLoginRequest)
}

export default watchLoginRequest
