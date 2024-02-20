import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex, Box, Text } from 'rebass'

import NavBar from '../components/NavBar'
import Player from '@/components/Player/Player'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/store'

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
            background-color: #1d1e22;
        }
    `
    const contentStyle = css`
        color: black;
        height: 100vh;

        border-radius: 10px;
    `

    return (
        <>
            <Flex css={MainStyle.styles} alignItems={''}>
                <Box>
                    <SideBar />
                </Box>
                <Box flex={2}>
                    <NavBar />

                    <Outlet />
                </Box>
            </Flex>
            <Player songs={data} />
        </>
    )
}
