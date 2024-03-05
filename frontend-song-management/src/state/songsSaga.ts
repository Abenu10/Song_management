import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'

import {
    setSongs,
    setSongsByGenre,
    setSearchSong,
    setCreateSongCauseAnError,
    setAddSongButtonLoading,
    setEditSongCauseAnError,
    setEditSongButtonLoading,
    setShowSuccessToast,
    setShowFailedToast,
    setOpenDeleteModal,
    setSong,
} from './songs/songsSlice'
import { push } from 'connected-react-router'
import { jwtDecode } from 'jwt-decode'
import axios, { AxiosResponse } from 'axios'
import { RootState } from './store'
import api from '../api/apiCalls'
import { JwtPayload } from 'jwt-decode'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

function* fetchSongs() {
    const token = localStorage.getItem('token')
    if (token) {
        const decodedToken: JwtPayload = jwtDecode(token)
        const currentTime = Date.now() / 1000
        if (decodedToken?.exp && decodedToken.exp < currentTime) {
            yield put(push('/login')) // Redirect to login if token is expired
        } else {
            try {
                const response = yield call(() =>
                    api.get(`${VITE_BASE_URL}/songs/list`)
                )
                yield put(setSongs(response.data.song))
            } catch (err) {
                console.log(err)
            }
        }
    } else {
        yield put(push('/login')) // Redirect to login if no token is found
    }
}
function* fetchSongsByGenre(action: any) {
    const { genre }: { genre: string } = action.payload
    try {
        const response: AxiosResponse = yield call(() =>
            api.get(`${VITE_BASE_URL}/songs/list/${genre}`)
        )
        if (response.data.message === 'list of songs by genre') {
            yield put(setSongsByGenre(response.data.song))
        } else {
            console.log('Unexpected response message:', response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
}

type formdData = {
    title: string
    artist: string
    album: string
    genre: string
    coverImageUrl: string
}

function* createSong(action: any) {
    yield put(setAddSongButtonLoading(true))

    // Check if action.payload exists before destructuring
    if (action.payload) {
        const { data, file }: { data: formdData; file: File } = action.payload
        console.log(data)

        // Create a new FormData instance
        const formData = new FormData()
        // Append the file and other data to the FormData instance
        formData.append('postAudio', file)
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key])
        })

        try {
            // Get user ID from server
            const userIdResponse: AxiosResponse = yield call(() => {
                return api.get('/auth/user/id') // Replace '/user/id' with your actual route
            })
            const userId = userIdResponse.data.userId

            const response: AxiosResponse = yield call(() => {
                return api.post(
                    `${VITE_BASE_URL}/songs/new/${userId}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
            })
            yield put(setCreateSongCauseAnError(false))
            console.log(response.data)
            yield put(setAddSongButtonLoading(false))
            const songId = response.data.song._id
            console.log(songId)
            yield put({
                type: 'songs/createSongSuccess',
                payload: response.data.song,
            })
            yield put({
                type: 'songs/setNewSongId',
                payload: songId,
            })
            yield put({
                type: 'songs/createSongSuccessToast',
                payload: response.data,
            })
            yield put({ type: 'songs/fetchSongs' })
        } catch (error) {
            yield put(setCreateSongCauseAnError(true))
            yield put(setAddSongButtonLoading(false))
            console.log(error)
            console.log('Payload is undefined')
        }
    } else {
        console.log('Payload is undefined')
    }
}
function* updateSongCover(action: any) {
    // Check if action.payload exists before destructuring
    if (action.payload) {
        const { id, file }: { id: string; file: File } = action.payload

        // Create a new FormData instance
        const formData = new FormData()
        // Append the file to the FormData instance
        formData.append('coverImage', file)

        try {
            const response: AxiosResponse = yield call(() => {
                return api.put(
                    `${VITE_BASE_URL}/songs/new/${id}/cover`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
            })
            console.log(response.data)
            yield put({ type: 'songs/fetchSongs' })
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log('Payload is undefined')
    }
}

function* updateSong(action: any) {
    yield put(setEditSongButtonLoading(true))

    // Check if action.payload exists before destructuring
    if (action.payload) {
        const { id, data }: { id: string; data: formdData } = action.payload
        console.log(data)
        console.log(id)
        try {
            const response: AxiosResponse = yield call(() => {
                return api.put(`${VITE_BASE_URL}/songs/${id}`, data)
            })
            yield put(setEditSongCauseAnError(false))
            console.log(response.data)
            yield put(setEditSongButtonLoading(false))
            yield put({ type: 'songs/fetchSongs' })
            yield put({ type: 'songs/editSongSuccess', payload: response.data })
        } catch (error) {
            yield put(setEditSongCauseAnError(true))
            yield put(setEditSongButtonLoading(false))
            console.log(error)
        }
    } else {
        console.log('Payload is undefined')
    }
}
// FIXME:
function* fetchSongById(action) {
    try {
        const response: AxiosResponse = yield call(
            axios.get,
            `/api/songs/${action.payload}`
        )
        yield put(setSong(response.data))
    } catch (error) {
        console.error('Failed to fetch song:', error)
    }
}

function* deleteSongById(action: any) {
    try {
        const { songid }: { songid: string } = action.payload
        console.log(songid, action)

        // Send a request to delete the song
        const response: AxiosResponse = yield call(() => {
            return api.delete(`${VITE_BASE_URL}/songs/${songid}`)
        })
        console.log(response.data.message)
        const songToRemove = response.data.song

        // Update the songs list and songs by genre after deletion
        const songs: RootState['songs']['songs'] = yield select(
            (state: RootState) => state.songs.songs
        )
        const songsByGenre: RootState['songs']['songsByGenre'] = yield select(
            (state: RootState) => state.songs.songsByGenre
        )

        const filteredSongs = songs.filter(
            (song) => song._id !== songToRemove._id
        )
        const filteredSongsByGenre = songsByGenre.filter(
            (song) => song._id !== songToRemove._id
        )

        yield put(setSongs(filteredSongs))
        yield put(setSongsByGenre(filteredSongsByGenre))

        // Set delete success Toast on
        yield put(setShowSuccessToast(true))
    } catch (error) {
        yield put(setOpenDeleteModal(false))
        yield put(setShowFailedToast(true))
        console.log(error)
    }
}

export function* postLoginInitializationSaga() {
    yield takeLatest('auth/postLoginInit', fetchSongs)
}

export function* fetchSongsSaga() {
    yield takeEvery('songs/fetchSongs', fetchSongs)
}

export function* fetchSongsByGenreSaga() {
    yield takeEvery('songsByGenre/fetchSongs', fetchSongsByGenre)
}
1

export function* createSongSaga() {
    yield takeEvery('song/createSong', createSong)
}
export function* updateSongCoverSaga() {
    yield takeEvery('song/updateSongCover', updateSongCover)
}
export function* updateSongSaga() {
    yield takeEvery('song/updateSong', updateSong)
}

// export function* getSongByIdSaga() {
//     yield takeEvery('song/getSongById', fetchSongById)
// }
export function* deleteSongByIdSaga() {
    yield takeEvery('song/deleteSongById', deleteSongById)
}
export function* watchFetchSongByIdSaga() {
    yield takeLatest('FETCH_SONG_BY_ID', fetchSongById)
}

function* watchResetNewSongId() {
    yield takeEvery('song/resetNewSongId', function* () {
        // additional logic here...
    })
}
