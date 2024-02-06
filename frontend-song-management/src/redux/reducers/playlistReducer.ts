import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Playlist {
    _id: string
    name: string
    songs: string[]
    owner: string
    collaborators: string[]
    requests: {
        user: string
        message: string
    }[]
}

const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: [] as Playlist[],
    reducers: {
        setPlaylists: (state, action: PayloadAction<Playlist[]>) =>
            action.payload,
        addPlaylist: (state, action: PayloadAction<Playlist>) => [
            ...state,
            action.payload,
        ],
        updatePlaylist: (state, action: PayloadAction<Playlist>) =>
            state.map((playlist: Playlist) =>
                playlist._id === action.payload._id ? action.payload : playlist
            ),
        deletePlaylist: (state, action: PayloadAction<string>) =>
            state.filter(
                (playlist: Playlist) => playlist._id !== action.payload
            ),
    },
})

export const { setPlaylists, addPlaylist, updatePlaylist, deletePlaylist } =
    playlistsSlice.actions
export default playlistsSlice.reducer
