import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CountItem {
    _id: string
    count: number
}

interface AlbumCountPerArtist {
    _id: string
    artist: string
    numberOfAlbums: number
}

interface StatsState {
    totalSongs: number
    totalArtists: number
    totalAlbums: number
    totalGenres: number
    genreCounts: CountItem[]
    artistSongCounts: CountItem[]
    albumSongCounts: CountItem[]
    albumCountsPerArtist: AlbumCountPerArtist[]
    isLoading: boolean
    stats: any
}

const initialState: StatsState = {
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalGenres: 0,
    genreCounts: [],
    artistSongCounts: [],
    albumSongCounts: [],
    albumCountsPerArtist: [],
    isLoading: false,
    stats: null,
}

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        setStats: (state, action: PayloadAction<StatsState>) => {
            state.stats = action.payload // Modify this line
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    },
})

export const { setStats, setIsLoading } = statsSlice.actions

export default statsSlice.reducer
