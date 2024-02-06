import { combineReducers } from 'redux'
import songsReducer from './songsReducer'
import playlistReducer from './playlistReducer'
import usersReducer from './usersReducer'
import authReducer from './authReducer'


const rootReducer = combineReducers({
    songs: songsReducer,
    playlists: playlistReducer,
    user: usersReducer,
    auth: authReducer,
})

export default rootReducer
