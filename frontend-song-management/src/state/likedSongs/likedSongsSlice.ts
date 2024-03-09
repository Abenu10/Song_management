import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LikedSong {
    _id: string
    title: string
    artist: string
    album: string
    genre: string
    songUrl: string
    publicId?: string
    userId: string
    likes: string[]
    __v?: Number
    createdAt: Date
    imageUrl: string
}

interface LikedSongsState {
    songs: LikedSong[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: LikedSongsState = {
    songs: [],
    status: 'idle',
    error: null,
}

export const likedSongsSlice = createSlice({
    name: 'likedSongs',
    initialState,
    reducers: {
        fetchLikedSongsStart: (state) => {
            state.status = 'loading'
        },
        fetchLikedSongsSuccess: (state, action: PayloadAction<LikedSong[]>) => {
            state.status = 'succeeded'
            state.songs = action.payload
        },
        fetchLikedSongsFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed'
            state.error = action.payload
        },
    },
})

export const {
    fetchLikedSongsStart,
    fetchLikedSongsSuccess,
    fetchLikedSongsFailure,
} = likedSongsSlice.actions

export default likedSongsSlice.reducer
