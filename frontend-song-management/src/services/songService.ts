// import axios from 'axios';

// const getSongs = () => {
//     return axios.get('/api/songs/list');
// };

// const getSong = (id: string) => {
//     return axios.get(`/api/songs/${id}`);
// };

// const createSong = (id: string, songData: FormData) => {
//     return axios.post(`/api/songs/new/${id}`, songData);
// };

// const updateSong = (id: string, songData: object) => {
//     return axios.put(`/api/songs/${id}`, songData);
// };

// const deleteSong = (id: string) => {
//     return axios.delete(`/api/songs/${id}`);
// };

// const getSongsByGenre = (genre: string) => {
//     return axios.get(`/api/songs/list/${genre}`);
// };

// const getSongsByUser = (userId: string) => {
//     return axios.get(`/api/songs/list/${userId}`);
// };

// const searchSongs = (query: string) => {
//     return axios.get(`/api/songs/search?q=${query}`);
// };

// const likeSong = (id: string, userId: string) => {
//     return axios.put(`/api/songs/${id}/like`, { userId });
// };

// const getSongStats = () => {
//     return axios.get('/api/songs/stats');
// };

// export default {
//     getSongs,
//     getSong,
//     createSong,
//     updateSong,
//     deleteSong,
//     getSongsByGenre,
//     getSongsByUser,
//     searchSongs,
//     likeSong,
//     getSongStats,
// };

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8800/api'; // Replace with your actual API URL

// Thunk for fetching songs
export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
  try {
    const response = await axios.get(`${API_URL}/songs/list`)
    return response.data;
  } catch (error) {
    throw new Error('Error fetching songs: ' + error);
  }
});

// ... other async actions (create, update, delete)
