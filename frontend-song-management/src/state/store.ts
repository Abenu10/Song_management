import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "./songs/songsSlice";
import PlayerReducer from "./player/PlayerSlice"
import songsStatisticsReducer from "./songs/songsStatisticsSlice"
import songsDataStatisticsReducer from "./songs/songsDataStatisticsSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    songsStatistics: songsStatisticsReducer,
    songsDataStatistics: songsDataStatisticsReducer,
    player: PlayerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
