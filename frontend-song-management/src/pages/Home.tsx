import React, { useEffect } from 'react'

import SongList from '@/components/SongList/SongList'
import { useDispatch, useSelector } from 'react-redux'
// import { Switch } from 'react-router'
import { Routes, Route } from 'react-router-dom'
import { ThunkDispatch } from '@reduxjs/toolkit'

import { fetchSongs } from '../services/songService'
import rootReducer from '../redux/reducers/root'
import { AppDispatch } from '../redux/store'
import { Song, Playlist, User } from './types' // Replace './types' with the actual path to the file where these types are defined

const Home = () => {

    
    const dispatch = useDispatch<AppDispatch>()
    // Define the state type
    interface RootState {
        router: RootState;
        songs: { songs: Song[]; isLoading: boolean; error: null }
        playlists: Playlist[]
        user: User | null
        auth: { isAuthenticated: boolean; token: string | null }
    }

    // Use the state type in useSelector
    const { songs, isLoading, error } = useSelector(
        (state: RootState) => state.songs
    )

    useEffect(() => {
        // Fetch songs when the component mounts
        dispatch(fetchSongs()) // Explicitly type dispatch as any
    }, [dispatch])

    return (
        <div>
            <SongList songs={songs} isLoading={isLoading} error={error} />
        </div>
    )
}

export default Home
