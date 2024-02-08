import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'http://localhost:8800/api' // Replace with your actual API URL

// Thunk for fetching songs
export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
    try {
        const response = await axios.get(`${API_URL}/songs/list`)
        return response.data
    } catch (error) {
        throw new Error('Error fetching songs: ' + error)
    }
})

// ... other async actions (create, update, delete)
// TODO: CHECK THE API ENDPOINTS
// Thunk for fetching a single song
export const fetchSong = createAsyncThunk(
    'songs/fetchSong',
    async (id: string) => {
        try {
            const response = await axios.get(`${API_URL}/songs/${id}`)
            return response.data
        } catch (error) {
            throw new Error('Error fetching song: ' + error)
        }
    }
)

// Thunk for creating a song
export const createSong = createAsyncThunk(
    'songs/createSong',
    async (songData: FormData) => {
        try {
            const response = await axios.post(`${API_URL}/songs/new`, songData)
            return response.data
        } catch (error) {
            throw new Error('Error creating song: ' + error)
        }
    }
)

// Thunk for updating a song
export const updateSong = createAsyncThunk(
    'songs/updateSong',
    async ({ id, songData }: { id: string; songData: object }) => {
        try {
            const response = await axios.put(`${API_URL}/songs/${id}`, songData)
            return response.data
        } catch (error) {
            throw new Error('Error updating song: ' + error)
        }
    }
)

// Thunk for deleting a song
export const deleteSong = createAsyncThunk(
    'songs/deleteSong',
    async (id: string) => {
        try {
            const response = await axios.delete(`${API_URL}/songs/${id}`)
            return response.data
        } catch (error) {
            throw new Error('Error deleting song: ' + error)
        }
    }
)

// Thunk for fetching songs by genre
export const fetchSongsByGenre = createAsyncThunk(
    'songs/fetchSongsByGenre',
    async (genre: string) => {
        try {
            const response = await axios.get(`${API_URL}/songs/list/${genre}`)
            return response.data
        } catch (error) {
            throw new Error('Error fetching songs by genre: ' + error)
        }
    }
)

// Thunk for fetching songs by user
export const fetchSongsByUser = createAsyncThunk(
    'songs/fetchSongsByUser',
    async (userId: string) => {
        try {
            const response = await axios.get(`${API_URL}/songs/list/${userId}`)
            return response.data
        } catch (error) {
            throw new Error('Error fetching songs by user: ' + error)
        }
    }
)

// Thunk for searching songs
export const searchSongs = createAsyncThunk(
    'songs/searchSongs',
    async (query: string) => {
        try {
            const response = await axios.get(
                `${API_URL}/songs/search?q=${query}`
            )
            return response.data
        } catch (error) {
            throw new Error('Error searching songs: ' + error)
        }
    }
)

// Thunk for liking a song
export const likeSong = createAsyncThunk(
    'songs/likeSong',
    async ({ id, userId }: { id: string; userId: string }) => {
        try {
            const response = await axios.put(`${API_URL}/songs/${id}/like`, {
                userId,
            })
            return response.data
        } catch (error) {
            throw new Error('Error liking song: ' + error)
        }
    }
)

// Thunk for fetching song stats
export const fetchSongStats = createAsyncThunk(
    'songs/fetchSongStats',
    async () => {
        try {
            const response = await axios.get(`${API_URL}/songs/stats`)
            return response.data
        } catch (error) {
            throw new Error('Error fetching song stats: ' + error)
        }
    }
)
