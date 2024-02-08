// import { takeEvery, call, put } from 'redux-saga/effects'
// import { PayloadAction } from '@reduxjs/toolkit'
// import songService from '../../services/songService'
// import { setSongs, setSong } from '../reducers/songsReducer' 
// // import the actions


// interface SongPayload {
//     id?: string
//     title?: string
//     artist?: string
//     album: string
//     genre?: string
//     songUrl?: string
//     publicId?: string
//     userId?: string
//     likes?: string[]
// }

// function* fetchSongs(): Generator<any, void, any> {
//     try {
//         const response = yield call(songService.getSongs)
//         yield put(setSongs(response.data))
//     } catch (error) {
//         // handle error
//     }
// }

// function* fetchSong(action: PayloadAction<SongPayload>) {
//     try {
//         const response = yield call(songService.getSong, action.payload.id)
//         yield put(setSong(response.data))
//     } catch (error) {
//         // handle error
//     }
// }

// // Add more sagas for other actions...

// function* watchSongRequests() {
//     yield takeEvery('FETCH_SONGS_REQUEST', fetchSongs)
//     yield takeEvery('FETCH_SONG_REQUEST', fetchSong)
//     // Add more watchers for other actions...
// }

// export default watchSongRequests
// import { put, takeLatest, all, call } from 'redux-saga/effects'
// import * as songService from '../../services/songService'
// import { fetchSongs } from '../../services/songService'
// import { setSongs, setLoading, setError } from '../reducers/songsReducer'

// // Worker Saga for fetching songs
// function* fetchSongsSaga() {
//     try {
//         yield put(setLoading(true))
//         const response = yield call(songService.getSongs)
//         yield put(setSongs(response))
//     } catch (error) {
//         yield put(setError(error.message))
//     } finally {
//         yield put(setLoading(false))
//     }
// }

// // Watcher Saga
// function* watchSongs() {
//     yield all([
//         takeLatest(fetchSongs.type, fetchSongsSaga),
//         // Add other takeLatest for create, update, delete
//     ])
// }

// export default watchSongs

import { takeLatest, all } from 'redux-saga/effects'
import { fetchSongs } from '../../services/songService'

// Watcher Saga
function* watchSongs() {
    yield all([
        takeLatest('FETCH_SONGS_REQUEST', fetchSongs),
        // Add other takeLatest for create, update, delete
    ])
}

export default watchSongs