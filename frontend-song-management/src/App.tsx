import '@/App.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Switch } from 'react-router'
import { Routes, Route } from 'react-router-dom'
import { ThunkDispatch } from '@reduxjs/toolkit'

import { fetchSongs } from './services/songService'
import SongList from './components/SongList/SongList'
import rootReducer from './redux/reducers/root'
import { AppDispatch } from './redux/store'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const App = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { songs, isLoading, error } = useSelector(
        (state: ReturnType<typeof rootReducer>) => state.songs
    )

    useEffect(() => {
        // Fetch songs when the component mounts
        dispatch(fetchSongs()) // Explicitly type dispatch as any
    }, [dispatch])

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <SongList
                            songs={songs}
                            isLoading={isLoading}
                            error={error}
                        />
                    }
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </>
    )
}

export default App
