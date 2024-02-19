import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Song {
    _id: string
    title: string
    artist: string
    album: string
    genre: string
    coverImageUrl: string
    createdAt: string
    updatedAt: string
    __v: number
}

interface Songs {
    songs: Song[]
    songsByGenre: Song[]
    searchedSong: Song
    getSongsLoading: boolean
    songsByGenreLoading: boolean
    searchedSongLoading: boolean
    isError: boolean
    isCreateSongCausingError: boolean
    addSongButtonLoading: boolean
    isEditSongCausingError: boolean
    EditSongButtonLoading: boolean
    isSongtoBeDeletedMarked: boolean
    isDeleteSongCausingError: boolean
    showSuccessToast: boolean
    showFailedToast: boolean
    showOpenDeleteModal: boolean
    markDeletedItem: boolean

    newSongId: string
}

const initialState: Songs = {
    songs: [],
    songsByGenre: [],
    searchedSong: {
        _id: '',
        title: '',
        artist: '',
        album: '',
        genre: '',
        coverImageUrl: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
    },
    getSongsLoading: true,
    songsByGenreLoading: true,
    searchedSongLoading: true,
    isError: false,
    // for creation purpose
    isCreateSongCausingError: false,
    addSongButtonLoading: false,
    // for editing purpose
    isEditSongCausingError: false,
    EditSongButtonLoading: false,
    // for deleting purpose
    isSongtoBeDeletedMarked: false,
    isDeleteSongCausingError: false,
    markDeletedItem: false,
    // for toast
    showSuccessToast: false,
    showFailedToast: false,
    // for modal
    showOpenDeleteModal: false,
    newSongId: '',
}

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setSongs: (state, action: PayloadAction<Song[]>) => {
            state.getSongsLoading = false
            state.songs = action.payload
        },
        setSongsByGenre: (state, action: PayloadAction<Song[]>) => {
            state.songsByGenreLoading = false
            state.songsByGenre = action.payload
        },
        setSearchSong: (state, action: PayloadAction<Song>) => {
            state.searchedSongLoading = false
            state.searchedSong = action.payload
        },
        setCreateSongCauseAnError: (state, action: PayloadAction<boolean>) => {
            state.isCreateSongCausingError = action.payload
        },
        setAddSongButtonLoading: (state, action: PayloadAction<boolean>) => {
            state.addSongButtonLoading = action.payload
        },
        setEditSongCauseAnError: (state, action: PayloadAction<boolean>) => {
            state.isEditSongCausingError = action.payload
        },
        setEditSongButtonLoading: (state, action: PayloadAction<boolean>) => {
            state.EditSongButtonLoading = action.payload
        },
        setShowSuccessToast: (state, action: PayloadAction<boolean>) => {
            state.showSuccessToast = action.payload
        },
        setShowFailedToast: (state, action: PayloadAction<boolean>) => {
            state.showFailedToast = action.payload
        },
        setOpenDeleteModal: (state, action: PayloadAction<boolean>) => {
            state.showOpenDeleteModal = action.payload
        },
        setmarkDeletedItem: (state, action: PayloadAction<boolean>) => {
            state.markDeletedItem = action.payload
        },
        createSongSuccess: (state, action: PayloadAction<string>) => {
            state.newSongId = action.payload
        },
    },
})

export const {
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
    setmarkDeletedItem,
    createSongSuccess,
} = songsSlice.actions

export default songsSlice.reducer
