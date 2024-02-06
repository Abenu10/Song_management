import { all, fork } from 'redux-saga/effects';
import songSaga from './songSaga';

export default function* rootSaga() {
    yield all([
        fork(songSaga),
        // fork(otherSaga),
        // Add other sagas here...
    ]);
}