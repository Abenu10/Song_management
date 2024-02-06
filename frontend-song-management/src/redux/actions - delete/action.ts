export const fetchSongsRequest = () => ({
    type: 'FETCH_SONGS_REQUEST',
})

export const fetchSongsSuccess = (songs: any) => ({
    type: 'FETCH_SONGS_SUCCESS',
    payload: songs,
})

export const fetchSongsFailure = (error: any) => ({
    type: 'FETCH_SONGS_FAILURE',
    payload: error,
})

export const addSongRequest = (song: any) => ({
    type: 'ADD_SONG_REQUEST',
    payload: song,
})

export const addSongSuccess = (song: any) => ({
    type: 'ADD_SONG_SUCCESS',
    payload: song,
})

export const addSongFailure = (error: any) => ({
    type: 'ADD_SONG_FAILURE',
    payload: error,
})
