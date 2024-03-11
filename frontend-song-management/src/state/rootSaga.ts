import { all } from 'redux-saga/effects'
import {
    fetchSongsSaga,
    fetchSongsByGenreSaga,
    createSongSaga,
    updateSongCoverSaga,
    updateSongSaga,
    deleteSongByIdSaga,
    postLoginInitializationSaga,
    watchFetchSongByIdSaga,
    watchSearchTermChange,
} from './songs/songsSaga'

import {
    watchLogin,
    watchRegister,
    // watchFetchUserFromCookie,
    watchLogout,
    watchFetchUserDetails,
} from './auth/authSaga'
import { watchFetchStats } from './stats/statSaga'
import { likedSongsSaga, likeSongsSaga } from './likedSongs/likedSongsSaga'

export default function* rootSaga() {
    yield all([
        watchLogin(),
        postLoginInitializationSaga(),
        watchRegister(),
        fetchSongsSaga(),
        fetchSongsByGenreSaga(),
        createSongSaga(),
        updateSongCoverSaga(),
        updateSongSaga(),
        deleteSongByIdSaga(),
        watchFetchUserDetails(),
        // watchFetchUserFromCookie(),
        watchLogout(),
        watchFetchSongByIdSaga(),
        watchFetchStats(),
        watchSearchTermChange(),
        likeSongsSaga(),
        likedSongsSaga(),
    ])
}
