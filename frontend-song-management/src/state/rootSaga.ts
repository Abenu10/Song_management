import { all } from 'redux-saga/effects'
import {
    fetchSongsSaga,
    fetchSongsByGenreSaga,
    createSongSaga,
    updateSongCoverSaga,
    updateSongSaga,
    getSongByIdSaga,
    deleteSongByIdSaga,
    postLoginInitializationSaga,
} from './songsSaga'
import {
    fetchSongsStatisticsSaga,
    fetchSongsStatisticsDataSaga,
} from './songsStatisticsSaga'
import {
    watchLogin,
    watchRegister,
    watchFetchUserFromCookie,
    watchLogout,
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
        getSongByIdSaga(),
        fetchSongsStatisticsSaga(),
        fetchSongsStatisticsDataSaga(),
        deleteSongByIdSaga(),
        watchFetchUserFromCookie(),
        watchLogout(),
    ])
}
