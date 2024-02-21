import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex, Box, Text } from 'rebass'

import { TbMenu2 } from 'react-icons/tb'
import { IoIosClose } from 'react-icons/io'
import { IoIosSearch } from 'react-icons/io'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { IoIosAddCircleOutline } from 'react-icons/io'
import SmallScreenSidebar from './SmallScreen/SmallScreenSidebar'
import { useState } from 'react'
import SongModal from './MultiStep/SongModal'
import { useDispatch } from 'react-redux'
import { logoutStart } from '@/state/auth/authSlice'

const LogoutButton = styled.button`
    // Add your styles here. For example:
    background-color: #f44336; // Red
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
`

const AddSongButton = styled.button`
    background: #53555c;
    color: rgb(230, 230, 230);
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
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
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
        color: rgba(255, 255, 255, 0.75);
        margin: 0px 0px;
        padding: 10px 20px;
        border-radius: 10px;
        position: sticky;
        top: 0;
        height: 70px;
        z-index: 0;
        gap: 20px;
    `
    const SearchStyleInput = styled.input`
        padding: 10px 32px;

        /* Add playful spirit: */
        background-color: #1d1e22;
        color: rgb(230, 230, 230);
        border: 1px solid #c0c0ff;
        font-size: 16px;
        outline: none;
        box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
        transition: 0.2s ease-in-out;
        border-radius: 8px; /* Rounded corners */
        width: 300px;

        &:focus {
            box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
            border-color: #9090ff;
        }
    `
    const StyledIcon4 = styled(IoIosAddCircleOutline)`
        margin-right: 10px;
        font-size: 30px;
    `
    const handleLogout = () => {
        dispatch(logoutStart())
        navigate('/')
    }
    return (
        <>
            {/* Nav bar */}
            <SmallScreenSidebar
                openMobileNav={open}
                onClick={() => setOpen(false)}
            />
            <Flex
                css={NavStyle.styles}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Box>
                    {/* <MenuIcon onClick={() => setOpen(true)} /> */}
                    {/* <Flex> */}
                    <AddSongButton onClick={openModal}>
                        <StyledIcon4 />
                        Add Song
                    </AddSongButton>
                    {/* </Flex> */}
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
                            placeholder="Search your Songs here..."
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
