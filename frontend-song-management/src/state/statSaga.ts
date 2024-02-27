import { call, put, takeEvery } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { setStats, setIsLoading } from './stats/statSlice'
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
import api from '../api/apiCalls'

export function* fetchStats() {
    try {
        yield put(setIsLoading(true))
        const response: AxiosResponse = yield call(() =>
            api.get(`${VITE_BASE_URL}/songs/stats`)
        )
        yield put(setStats(response.data))
        yield put(setIsLoading(false))
    } catch (error) {
        console.log(error)
    }
}

export function* watchFetchStats() {
    yield takeEvery('stats/fetch', fetchStats)
}
