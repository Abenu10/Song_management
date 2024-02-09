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
import Home from './pages/Home'

const App = () => {
  
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                      <Home />  
                    }
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </>
    )
}

export default App
