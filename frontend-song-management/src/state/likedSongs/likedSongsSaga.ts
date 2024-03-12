import { call, put, takeEvery } from 'redux-saga/effects'
import {
    fetchLikedSongsStart,
    fetchLikedSongsSuccess,
    fetchLikedSongsFailure,
    likeSongStart,
    likeSongSuccess,
    likeSongFailure,
} from './likedSongsSlice'
import axios, { AxiosResponse } from 'axios'
import api from '../../api/apiCalls'

function* fetchLikedSongs(action: any) {
    try {
        const likedSongs: AxiosResponse = yield call(
            () => api.get('songs/user/likes')
            // ,
            // action.payload
        )
        yield put(fetchLikedSongsSuccess(likedSongs.data))
    } catch (e) {
        yield put(fetchLikedSongsFailure(e.message))
    }
}
function* likeSong(action:any) {
    try {
        const response: AxiosResponse = yield call(() =>
            api.put(`/songs/${action.payload}/like`)
        )
        yield put(likeSongSuccess(response.data))
    } catch (e) {
        yield put(likeSongFailure(e.message))
    }
}

export function* likeSongsSaga() {
    yield takeEvery(fetchLikedSongsStart.type, fetchLikedSongs)
    yield takeEvery(likeSongStart.type, likeSong) // Add this line
}

export function* likedSongsSaga() {
    yield takeEvery(fetchLikedSongsStart.type, fetchLikedSongs)
}
