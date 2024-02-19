import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import {
    loginStart,
    loginSuccess,
    loginFailure,
    postLoginInit,
    registerStart,
    registerSuccess,
    registerFailure,
} from '../state/auth/authSlice'
import axios, { AxiosResponse } from 'axios'

import { fetchSongsSaga } from './songsSaga'
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

function* handleLogin(action: any) {
    try {
        const res: AxiosResponse = yield call(
            axios.post,
            `${VITE_BASE_URL}/auth`,
            action.payload,
            { withCredentials: true }
        )
        yield put(loginSuccess(res.data))
        yield put(postLoginInit())
    } catch (err) {
        yield put(loginFailure())
    }
}

// FIXME: create for registration
function* handleRegister(action: any) {
    try {
        const res: AxiosResponse = yield call(
            axios.post,
            `${VITE_BASE_URL}/users`,
            action.payload,
            { withCredentials: true }
        )
        yield put(registerSuccess(res.data))
        // yield put(postLoginInit())
    } catch (err) {
        yield put(registerFailure())
    }
}

// FIXME: get autnticated user

// function* fetchUserDataSaga() {
//   try {
//     const response = yield call(axios.get, '/api/auth');
//     yield put({ type: 'user/fetchSuccess', payload: response.data });
//   } catch (err) {
//     yield put({ type: 'user/fetchFailure', payload: err.message });
//   }
// }

export function* watchLogin() {
    yield takeLatest(loginStart.type, handleLogin)
}
export function* watchRegister() {
    yield takeLatest(registerStart.type, handleRegister)
}
