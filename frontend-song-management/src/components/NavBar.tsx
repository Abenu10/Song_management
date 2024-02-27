// import Cookies from 'js-cookie'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex, Box, Text } from 'rebass'

import { TbMenu2 } from 'react-icons/tb'
import { IoIosClose } from 'react-icons/io'
import { IoIosSearch } from 'react-icons/io'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { IoIosAddCircleOutline } from 'react-icons/io'
import SmallScreenSidebar from './SmallScreen- ❌/SmallScreenSidebar'
import { useState } from 'react'
import SongModal from './MultiStep/SongModal'
import { useDispatch } from 'react-redux'

import { logoutStart } from '@/state/auth/authSlice'
import { setSelectedGenre } from '../state/songs/songsSlice'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const LogoutButton = styled.button`
    // Add your styles here. For example:
    background: #1f6fd0;
    color: rgb(230, 230, 230);
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
`

const AddSongButton = styled.button`
    position: fixed;
    right: 62px;
    bottom: 131px;
    background-color: #1f6fd0;
    color: #fff;
    border: none;
    border-radius: 50%; // This will make the button a perfect circle
    padding: 0px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
    transition: background-color 0.3s ease;
    width: 60px; // Set the width of the button
    height: 60px; // Set the height of the button

    &:hover {
        background-color: #0056b3;
    }
`
const MenuIcon = styled(TbMenu2)`
    cursor: pointer;
    font-size: 40px;
`
const SearchIcon = styled(IoIosSearch)`
    cursor: pointer;
    font-size: 25px;
    position: absolute;
    margin-left: 5px;
`

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`
const StyledSelect = styled.select`
    padding: 10px;
    background-color: #1f6fd0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;

    &:focus {
        box-shadow: 0 0 10px rgba(0, 0, 255, 0.2);
        transform: scale(1.02);
    }

    option {
        padding: 10px;
        background-color: #1f6fd0;
        color: #000;
        border-radius: 4px;
    }
`
const genres = [
    'All',
    'Jazz',
    'Electronic',
    'Rock',
    'Pop',
    'Hip-Hop',
    'Rap',
    'Classical',
    'Ethiopian Music',
    'other',
]

export default function NavBar({ openModal }: { openModal: any }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const location = useLocation()

    // const openModal = () => setModalOpen(true) // Function to open modal
    // const closeModal = () => setModalOpen(false) // Function to close modal
    // const [modalOpen, setModalOpen] = useState(false) // State to manage modal visibility

    const NavStyle = css`
        // background: #1F3044;
        background: transparent;
        backdrop-filter: blur(10px);
        /* border: 1px solid rgba(255, 255, 255, 0.1); */
        /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
        color: rgba(255, 255, 255, 0.75);
        margin: 0px 0px;
        padding: 10px 20px;
        border-radius: 10px;
        /* position: sticky; */
        top: 0;
        height: 70px;
        z-index: 0;
        gap: 20px;
    `
    const SearchStyleInput = styled.input`
        padding: 10px 32px;

        /* Add playful spirit: */
        background: linear-gradient(
            to right,

            rgb(31, 111, 208, 0.5),
            transparent
        );
        color: rgb(230, 230, 230);
        /* border: 1px solid #c0c0ff; */
        border: none;
        outline: none;

        font-size: 16px;
        outline: none;
        box-shadow: none;
        transition: 0.2s ease-in-out;
        border-radius: 8px; /* Rounded corners */
        width: 300px;

        &:focus {
            box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
            border-color: #53555c;
            outline: auto;
        }
    `
    const StyledIcon4 = styled(IoIosAddCircleOutline)`
        margin-right: 0px;
        font-size: 60px;
    `
    const handleLogout = () => {
        dispatch(logoutStart())
        // Cookies.remove('token', { httpOnly: true, sameSite: 'strict' })
        navigate('/login')
    }
    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGenre =
            event.target.value === 'All' ? '' : event.target.value
        dispatch({ type: 'songs/setSelectedGenre', payload: selectedGenre })
    }
    return (
        <>
            <ReactTooltip
                id="my-tooltip-1"
                place="top"
                variant="info"
                content="Add Song"
                style={{ fontSize: '1.2rem' }}
            />
            <AddSongButton data-tooltip-id="my-tooltip-1" onClick={openModal}>
                <StyledIcon4 />
            </AddSongButton>
            <Flex
                css={NavStyle.styles}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Box>
                    <StyledSelect onChange={handleGenreChange}>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </StyledSelect>
                </Box>

                <Box>
                    <SearchContainer
                        style={{
                            display:
                                location.pathname === '/' ? 'flex' : 'none',
                        }}
                    >
                        <SearchIcon />
                        <SearchStyleInput
                            type="text"
                            placeholder="Search for songs, artists etc..."
                        />
                    </SearchContainer>
                </Box>
                <Box>
                    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                </Box>
                {/* <SongModal isOpen={modalOpen} onClose={closeModal} />{' '} */}
            </Flex>
        </>
    )
}
