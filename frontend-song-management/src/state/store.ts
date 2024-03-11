import { configureStore } from '@reduxjs/toolkit'
import songsReducer from './songs/songsSlice'
import PlayerReducer from './player/PlayerSlice'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import AuthReducer from '../state/auth/authSlice'
import UserReducer from '../state/user/userSlice'
import statsReducer from '../state/stats/statSlice'
import likedSongsReducer from './likedSongs/likedSongsSlice'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        songs: songsReducer,
        player: PlayerReducer,
        auth: AuthReducer,
        user: UserReducer,
        stats: statsReducer,
        likedSongs: likedSongsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
