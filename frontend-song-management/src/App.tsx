import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Main from './layout/Main'
import Home from './pages/Home'
import GenrePage from './pages/PlaylistPage'

//

import { useState, useEffect } from 'react'
import { BiCategory } from 'react-icons/bi'
import { IoMdHome } from 'react-icons/io'
import { IoStatsChart } from 'react-icons/io5'
import { TbMenu2 } from 'react-icons/tb'
import { IoIosClose } from 'react-icons/io'
// Styled component should be defined outside of the component function
import { css } from '@emotion/react'
import styled from '@emotion/styled'

// import { useContext } from 'react'
// import { AuthContext } from './context/AuthContext'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import { RootState } from './state/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Spinner from './components/spinner❌/Spinner'

import { jwtDecode } from 'jwt-decode'
import { loginSuccess } from './state/auth/authSlice'
import { fetchUserDetailsStart } from './state/user/userSlice'
import axios, { AxiosResponse } from 'axios'
import Playlist from './pages/playlist/Playlist'
import PlaylistPage from './pages/PlaylistPage'
import Statistics from './pages/statistics/Statistics'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

const StyledIcon = styled(IoMdHome)`
    margin-right: 10px;
    font-size: 30px;
`
const StyledIcon2 = styled(BiCategory)`
    margin-right: 10px;
    font-size: 30px;
`
const StyledIcon3 = styled(IoStatsChart)`
    margin-right: 10px;
    font-size: 30px;
`
const MenuIcon = styled(TbMenu2)`
    position: absolute;
    cursor: pointer;
    left: 0;
    top: 25px;
    font-size: 35px;
`
const CloseIcon = styled(IoIosClose)`
    font-size: 40px;
    cursor: pointer;
    transition: all 0.5s ease;
`

function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const handleResize = () => {
            // Check the screen width and update the state accordingly
            if (window.innerWidth <= 992) {
                setOpenSidebar(true)
            } else {
                setOpenSidebar(false)
            }
        }

        // Add event listener for window resize
        window.addEventListener('resize', handleResize)

        // Initial check for screen width when component mounts
        handleResize()

        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize)
        }
        let timeoutId: NodeJS.Timeout

        function resetTimeout() {
            // Clear the previous timeout
            clearTimeout(timeoutId)

            // Set a new timeout
            timeoutId = setTimeout(() => {
                // Remove the token from local storage
                localStorage.removeItem('token')

                // Navigate to login page
                // navigate('/login')
            }, 36000) // 1 hour
        }

        // Call resetTimeout whenever the user interacts with the application
        window.onmousemove = resetTimeout
        window.onmousedown = resetTimeout
        window.onclick = resetTimeout
        window.onscroll = resetTimeout
        window.onkeypress = resetTimeout

        // Set the initial timeout
        resetTimeout()

        // Clean up function to remove the event listeners when the component unmounts
        return () => {
            window.onmousemove = null
            window.onmousedown = null
            window.onclick = null
            window.onscroll = null
            window.onkeypress = null
        }
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodedToken = jwtDecode(token)
            dispatch(loginSuccess({ user: decodedToken }))
            dispatch(fetchUserDetailsStart())
            dispatch({ type: 'stats/fetch' })
        }
        setIsLoading(false)
    }, [dispatch])

    // useEffect(() => {
    //     dispatch({ type: 'stats/fetch' })
    // }, [dispatch])

    const user = useSelector((state: RootState) => state.auth.user)
    const isFetching = useSelector((state: RootState) => state.auth.isFetching)
    const [isLoading, setIsLoading] = useState(true)

    console.log(user)
    console.log(isFetching)

    const [openSidebar, setOpenSidebar] = useState(false)

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <Routes>
                    <Route
                        path="/login"
                        element={!user ? <Login /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/register"
                        element={!user ? <Register /> : <Navigate to="/" />}
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Main />}>
                        <Route index element={<Home />} />
                        {/* <Route path="playlist" element={<GenrePage />} /> */}
                        <Route path="playlist" element={<PlaylistPage />} />
                        <Route
                            path="playlist/:playlistID"
                            element={<Playlist />}
                        />
                        <Route path="Statistics" element={<Statistics />} />
                        {/* <Route path="editSong/:id" element={<EditSongPage />} /> */}
                    </Route>
                </Routes>
            )}
            s
        </>
    )
}

export default App
