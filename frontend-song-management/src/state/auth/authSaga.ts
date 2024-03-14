import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import {
    loginStart,
    loginSuccess,
    loginFailure,
    postLoginInit,
    registerStart,
    registerSuccess,
    registerFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
} from './authSlice'
import {
    fetchUserDetailsStart,
    fetchUserDetailsSuccess,
    fetchUserDetailsFailure,
} from '../user/userSlice'
import axios, { AxiosResponse } from 'axios'
// import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { fetchSongsSaga } from '../songs/songsSaga'
import api from '../../api/apiCalls'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

function* handleLogin(action: any) {
    try {
        const res: AxiosResponse = yield call(
            axios.post,
            `${VITE_BASE_URL}/auth`,
            action.payload
            // ,
            // { withCredentials: true }
        )
        // Set the token in the local storage
        localStorage.setItem('token', res.data.token)
        yield put(loginSuccess(res.data))
        // const token = localStorage.getItem('token')
        // console.log('Token:', token)
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
            action.payload
            // ,
            // { withCredentials: true }
        )
        localStorage.setItem('token', res.data.token)

        yield put(registerSuccess(res.data))
        // yield put(postLoginInit())
    } catch (err) {
        yield put(registerFailure())
    }
}

// FIXME: get autnticated user

function* fetchUserDetails() {
    try {
        const token = localStorage.getItem('token')
        const response: AxiosResponse = yield call(() =>
            axios.get(`${VITE_BASE_URL}/auth`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            })
        )
        yield put(fetchUserDetailsSuccess(response.data))
        console.log(response.data)
        // yield put({ type: 'user/fetchSuccess', payload: response.data });
    } catch (err) {
        yield put(fetchUserDetailsFailure())
        // yield put({ type: 'user/fetchFailure', payload: err.message });
    }
}

// Fetch user from cookie

// function* fetchUserFromCookie() {
//     const token = Cookies.get('token')
//     if (token) {
//         const user = jwtDecode(token)
//         yield put(loginSuccess(user))
//     }
// }



function* logoutSaga() {
    try {
        yield call(api.get, `${VITE_BASE_URL}/auth/logout`)
        localStorage.removeItem('token')
        yield put(logoutSuccess())
        yield put({ type: 'NAVIGATE_TO_LOGIN' })

    } catch (err) {
        yield put(logoutFailure(err.message))
    }
}

export function* watchLogin() {
    yield takeLatest(loginStart.type, handleLogin)
}
export function* watchRegister() {
    yield takeLatest(registerStart.type, handleRegister)
}
// export function* watchFetchUserFromCookie() {
//     yield takeLatest('FETCH_USER_FROM_COOKIE', fetchUserFromCookie)
// }
export function* watchFetchUserDetails() {
    yield takeLatest(fetchUserDetailsStart.type, fetchUserDetails)
}

export function* watchLogout() {
    yield takeLatest(logoutStart.type, logoutSaga)
}
