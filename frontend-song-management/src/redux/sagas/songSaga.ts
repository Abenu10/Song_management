import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { AxiosResponse } from 'axios';

// Worker Saga
function* fetchSongs(): Generator<any, void, any> {
    try {
        const response: AxiosResponse = yield axios.get('/api/songs');
        yield put({ type: 'FETCH_SONGS_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'FETCH_SONGS_FAILURE', payload: error });
    }
}

// Watcher Saga
function* songSaga() {
    yield takeEvery('FETCH_SONGS_REQUEST', fetchSongs);
}

export default songSaga;