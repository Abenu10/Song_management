import { takeEvery, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import userService from '../../services/userService';
import { setUser, updateUser } from '../reducers/usersReducer'; // import the actions

interface UserPayload {
    id?: string;
    user?: User; // Define User type based on your data structure
}

function* fetchUser(action: PayloadAction<UserPayload>) {
    try {
        const response = yield call(userService.getUser, action.payload.id);
        yield put(setUser(response.data));
    } catch (error) {
        // handle error
    }
}

function* createUser(action: PayloadAction<UserPayload>) {
    try {
        const response = yield call(userService.createUser, action.payload.user);
        yield put(setUser(response.data));
    } catch (error) {
        // handle error
    }
}

function* updateUserSaga(action: PayloadAction<UserPayload>) {
    try {
        const response = yield call(userService.updateUser, action.payload.id, action.payload.user);
        yield put(updateUser(response.data));
    } catch (error) {
        // handle error
    }
}

function* watchUserRequests() {
    yield takeEvery('FETCH_USER_REQUEST', fetchUser);
    yield takeEvery('CREATE_USER_REQUEST', createUser);
    yield takeEvery('UPDATE_USER_REQUEST', updateUserSaga);
}

export default watchUserRequests;