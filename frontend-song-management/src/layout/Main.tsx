import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex, Box, Text } from 'rebass'

import NavBar from '../components/NavBar'
import Player from '@/components/Player/Player'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'
import SongModal from '@/components/MultiStep/SongModal'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'

interface Song {
    _id: string
    title: string
    artist: string
    album: string
    genre: string
    songUrl: string
    publicId?: string
    userId: string
    likes: string[]
    __v?: Number
}

export default function Main() {
    const data = useSelector((state: RootState) => state.songs.songs)
    const MainStyle = css`
        padding: 0px 15px;
        @media screen and (min-width: 768px) {
            gap: 15px; /* Adjust width for larger screens */
            padding: 0px;
            padding-right: 15px;
            background-color: #0d1117;
        }
    `

    const openModal = () => setModalOpen(true) // Function to open modal
    const closeModal = () => setModalOpen(false) // Function to close modal
    const [modalOpen, setModalOpen] = useState(false) // State to manage modal visibility

    return (
        <>
            <Flex
                css={MainStyle.styles}
                alignItems={''}
                style={{ minHeight: '100vh' }}
            >
                <Box>
                    <SideBar />
                </Box>
                <Box flex={2}>
                    {/* <NavBar /> */}
                    <NavBar openModal={openModal} />
                    <Outlet />
                </Box>
            </Flex>
            <Player songs={data} />
            <SongModal isOpen={modalOpen} onClose={closeModal} />{' '}
        </>
    )
}
