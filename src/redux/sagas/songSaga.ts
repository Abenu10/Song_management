import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchSongs() {
  try {
    const response = yield axios.get('/api/songs');
    yield put({ type: 'FETCH_SONGS_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_SONGS_FAILURE', payload: error });
  }
}

function* songSaga() {
  yield takeEvery('FETCH_SONGS_REQUEST', fetchSongs);
}

export default songSaga;