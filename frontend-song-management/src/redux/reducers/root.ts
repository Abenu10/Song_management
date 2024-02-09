import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import songsReducer from './songsReducer'
import playlistReducer from './playlistReducer'
import usersReducer from './usersReducer'
import authReducer from './authReducer'

const rootReducer = (history: History)=> combineReducers({
    router: connectRouter(history),
    songs: songsReducer,
    playlists: playlistReducer,
    user: usersReducer,
    auth: authReducer,
})

export default rootReducer
