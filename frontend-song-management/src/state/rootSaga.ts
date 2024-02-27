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
} from './songsSaga'

import {
    watchLogin,
    watchRegister,
    // watchFetchUserFromCookie,
    watchLogout,
    watchFetchUserDetails,
} from './authSaga'
import { watchFetchStats } from './statSaga'

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
    ])
}
