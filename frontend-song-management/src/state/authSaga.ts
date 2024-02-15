import { call, put, takeLatest } from 'redux-saga/effects';
import { loginStart, loginSuccess, loginFailure } from '../state/auth/authSlice';
import axios, { AxiosResponse } from 'axios'


const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

function* handleLogin(action: any) {
  try {
      const res: AxiosResponse = yield call(
          axios.post,
          `${VITE_BASE_URL}/auth`,
          action.payload
      )
      const token = res.data.token 
      localStorage.setItem('authToken', token)
      yield put(loginSuccess(res.data))
  } catch (err) {
    yield put(loginFailure());
  }
}


// FIXME: create for registration 

// FIXME: get autnticated user 

// function* fetchUserDataSaga() {
//   try {
//     const response = yield call(axios.get, '/api/auth');
//     yield put({ type: 'user/fetchSuccess', payload: response.data });
//   } catch (err) {
//     yield put({ type: 'user/fetchFailure', payload: err.message });
//   }
// }


export function* watchLogin() {
  yield takeLatest(loginStart.type, handleLogin);
}