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
import { fetchSongs } from '../../senpm install --save-dev esbuild-plugin-htmlrvices/songService'

// Watcher Saga
function* watchSongs() {
    yield all([
        takeLatest('FETCH_SONGS_REQUEST', fetchSongs),
        // Add other takeLatest for create, update, delete
    ])
}

export default watchSongs

// createSongSaga: This saga would handle creating a new song. It would listen for a CREATE_SONG_REQUEST action and then call a service function that sends a POST request to /api/songs/new/:id.

// updateSongSaga: This saga would handle updating a song. It would listen for an UPDATE_SONG_REQUEST action and then call a service function that sends a PUT request to /api/songs/:id.

// deleteSongSaga: This saga would handle deleting a song. It would listen for a DELETE_SONG_REQUEST action and then call a service function that sends a DELETE request to /api/songs/:id.

// likeSongSaga: This saga would handle liking a song. It would listen for a LIKE_SONG_REQUEST action and then call a service function that sends a PUT request to /api/songs/:id/like.

// fetchSongStatsSaga: This saga would handle fetching song statistics. It would listen for a FETCH_SONG_STATS_REQUEST action and then call a service function that sends a GET request to /api/songs/stats.
// fetchSongsByUserSaga: This saga would handle fetching songs by user. It would listen for a FETCH_SONGS_BY_USER_REQUEST action and then call a service function that sends a GET request to /api/songs/list/:id.

// searchSongsSaga: This saga would handle searching for songs. It would listen for a SEARCH_SONGS_REQUEST action and then call a service function that sends a GET request to /api/songs/search.

// Remember to add these sagas to your watchSongs function using takeLatest or takeEvery.

// TODO: WORK ON THE SAGAS
