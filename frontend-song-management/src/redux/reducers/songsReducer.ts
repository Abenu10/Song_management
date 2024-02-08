
import { createSlice } from '@reduxjs/toolkit'
import { fetchSongs } from '../../services/songService'

const songsSlice = createSlice({
    name: 'songs',
    initialState: {
        songs: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        // Add any synchronous actions here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSongs.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchSongs.fulfilled, (state, action) => {
                state.isLoading = false
                state.songs = action.payload
            })
            .addCase(fetchSongs.rejected, (state, action) => {
                state.isLoading = false
                // state = action.error.message
            })

        // Similarly, handle other async actions (create, update, delete) here
    },
})

export default songsSlice.reducer
