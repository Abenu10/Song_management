// import axios, { AxiosResponse } from 'axios'
// import { call, put, takeEvery } from 'redux-saga/effects'
// import { fetchStart, fetchSuccess, fetchError } from '../state/stats/statSlice'
// // import api from 'api' // replace with your actual API module
// const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
// import api from '../api/apiCalls'

// function* fetchStats() {
//     try {
//         yield put(fetchStart())
//         const stats: AxiosResponse = yield call(() =>
//             api.get(`${VITE_BASE_URL}/songs/stats`)
//         ) // replace with your actual API call
//         yield put(fetchSuccess(stats))
//     } catch (error) {
//         yield put(fetchError(error.toString()))
//     }
// }

// export function* watchFetchStats() {
//     yield takeEvery('stats/fetch', fetchStats)
// }

import { call, put, takeEvery } from 'redux-saga/effects'
import axios, { AxiosResponse } from 'axios'
import { setStats, setIsLoading } from './stats/statSlice'
import api from '../api/apiCalls'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

// Example API call
const fetchStatsApi = () => {
    return api.get(`${VITE_BASE_URL}/songs/stats`)
}

export function* fetchStats() {
    try {
        yield put(setIsLoading(true))
        const response: AxiosResponse = yield call(fetchStatsApi)
        yield put(setStats(response.data))
        yield put(setIsLoading(false))
    } catch (error) {
        console.error('Error fetching stats:', error)
        yield put(setIsLoading(false))
    }
}

export function* watchFetchStats() {
    yield takeEvery('stats/fetch', fetchStats)
}
