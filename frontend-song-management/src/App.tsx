import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Main from './layout/Main'
import Home from './pages/Home'
import GenrePage from './pages/GenrePage'
import StatisticsPage from './pages/StatisticsPage'
import FilteredSongsPage from './pages/FilteredSongsPage'
// import AddSongPage from './pages/AddSong delete❌/AddSongPage'
import EditSongPage from './pages/EditSongPage'
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
import Spinner from './components/spinner/Spinner'

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
    left: 40px;
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
        dispatch({ type: 'FETCH_USER_FROM_COOKIE' })
    }, [dispatch])

    const user = useSelector((state: RootState) => state.auth.user)
    const isFetching = useSelector((state: RootState) => state.auth.isFetching)

    useEffect(() => {
        if (user) {
            navigate('/') // navigate to home if user exists
        } else {
            navigate('/login') // navigate to login if user does not exist
        }
    }, [user, navigate])
    // const { user } = useContext(AuthContext)
    console.log(user)
    console.log(isFetching)

    // useEffect(() => {
    //     // Simulate a network request
    //     setTimeout(() => {
    //       setIsFetching(false);
    //     }, 2000);
    //   }, []);

    const [openSidebar, setOpenSidebar] = useState(false)

    const sideBarStyle = css`
        position: fixed;
        top: 0;
        left: ${openSidebar ? '-350px' : '0px'};
        width: 350px;
        height: 100%;
        background: #1d2228;
        transition: all 0.5s ease;
        font-weight: bolder;
    `
    const sideBarElement = css`
        font-size: 20px;
        color: #e1e2e2;

        padding: 7px;
        margin: 5px 16px;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 10px;
        &:hover {
            color: #fb8122;
        }
        transition: 0.4s;
    `

    const header = css`
        font-size: 22px;
        color: #e1e2e2;
        text-align: center;
    `
    const menu = css`
        margin-top: 25px;
        padding: 0px 10px;
    `
    function openMySidebar() {
        setOpenSidebar((prev) => !prev)
    }
    function closeMySidebar() {
        setOpenSidebar((prev) => !prev)
    }
    const hiddenOnMediumScreen = css`
        @media (max-width: 768px) {
            display: none;
        }
    `
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
    }, [])

    return (
        <>
            {/* {isFetching ? (
                <Spinner />
            ) : ( */}

            <Routes>
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/"
                    element={
                        user ? <Navigate to="/" /> : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/register"
                    element={user ? <Navigate to="/" /> : <Register />}
                />
                <Route
                    path="/profile"
                    element={user ? <Profile /> : <Navigate to="/" />}
                />

                <Route
                    path="/"
                    element={user ? <Main /> : <Navigate to="/login" />}
                >
                    <Route index element={<Home />} />
                    <Route path="genre" element={<GenrePage />} />
                    <Route
                        path="genre/:genre"
                        element={<FilteredSongsPage />}
                    />
                    <Route path="Statistics" element={<StatisticsPage />} />
                    {/* <Route path="addSong" element={<AddSongPage />} /> */}
                    <Route path="editSong/:id" element={<EditSongPage />} />
                </Route>
            </Routes>

            {/* )} */}
        </>
    )
}

export default App
