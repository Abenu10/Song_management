// src/state/playerSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        currentSong: null,
        isPlaying: false,
    },
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload
        },
        playSong: (state) => {
            state.isPlaying = true
        },
        pauseSong: (state) => {
            state.isPlaying = false
        },
    },
})

export const { setCurrentSong, playSong, pauseSong } = playerSlice.actions

export default playerSlice.reducer
