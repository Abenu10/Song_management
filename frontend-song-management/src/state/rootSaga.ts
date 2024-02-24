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
    fetchSongsStatisticsSaga,
    fetchSongsStatisticsDataSaga,
} from './songsStatisticsSaga'
import {
    watchLogin,
    watchRegister,
    // watchFetchUserFromCookie,
    watchLogout,
    watchFetchUserDetails,
} from './authSaga'

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
        fetchSongsStatisticsSaga(),
        fetchSongsStatisticsDataSaga(),
        deleteSongByIdSaga(),
        watchFetchUserDetails(),
        // watchFetchUserFromCookie(),
        watchLogout(),
        watchFetchSongByIdSaga(),
    ])
}
