import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
    songUrl: string;
    publicId: string;
    userId: string;
    likes: string[];
}

const songsSlice = createSlice({
    name: 'songs',
    initialState: [] as Song[],
    reducers: {
        setSongs: (state, action: PayloadAction<Song[]>) => action.payload,
        addSong: (state, action: PayloadAction<Song>) => [
            ...state,
            action.payload,
        ],
        updateSong: (state, action: PayloadAction<Song>) =>
            state.map((song: Song) =>
                song._id === action.payload._id ? action.payload : song
            ),
        deleteSong: (state, action: PayloadAction<string>) =>
            state.filter((song: Song) => song._id !== action.payload),
    },
})

export const { setSongs, addSong, updateSong, deleteSong } = songsSlice.actions;
export default songsSlice.reducer;