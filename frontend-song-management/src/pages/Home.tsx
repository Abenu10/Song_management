import React from 'react'
import { useEffect } from 'react'
import { Flex, Box, Text } from 'rebass'
import Music from '../components/Music/Music'
import { css } from '@emotion/react'
//
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { Key } from '@mui/icons-material'
import Player from '../components/Player/Player'
import { backgroundColor } from 'styled-system'
import { format } from 'timeago.js'
import SongTableTitle from '../components/Music/SongTableTitle'
import { Analytics } from '@vercel/analytics/react'

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
    createdAt: Date
    imageUrl: string
}

function Home() {
    const dispatch = useDispatch()
    const songsByGenre = useSelector(
        (state: RootState) => state.songs.songsByGenre
    )
    const selectedGenre = useSelector(
        (state: RootState) => state.songs.selectedGenre
    )
    useEffect(() => {
        if (selectedGenre) {
            dispatch({
                type: 'songsByGenre/fetchSongs',
                payload: { genre: selectedGenre },
            })
        } else {
            dispatch({ type: 'songs/fetchSongs' })
        }
    }, [selectedGenre, dispatch])

    const data = useSelector((state: RootState) => state.songs.songs)

    const isLoading = useSelector(
        (state: RootState) => state.songs.getSongsLoading
    )
    const HomeStyle = css`
        width: 100%;
    `

    // useEffect(() => {
    //     dispatch({ type: 'songs/fetchSongs' })
    // }, [])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    console.log(data)

    const songsToDisplay = selectedGenre ? songsByGenre : data
    return (
        <>
            <Flex
                flexDirection={'column'}
                css={HomeStyle.styles}
                style={{
                    backgroundColor: '#0d1117',
                    // overflow: 'auto',
                    // height: 'calc(100vh - 8rem)',
                }}
            >
                <Box>
                    <Text fontSize={5} fontWeight="bold">
                        Songs
                    </Text>
                </Box>
                <Box>
                    <SongTableTitle />
                    {songsToDisplay.map((song: Song) => {
                        return (
                            <>
                                <Music
                                    // isLoading={isLoading}
                                    key={song._id}
                                    artist={song.artist}
                                    title={song.title}
                                    album={song.album}
                                    genre={song.genre}
                                    songUrl={song.songUrl}
                                    userId={song.userId}
                                    likes={song.likes}
                                    // imageUrl={}
                                    _id={song._id}
                                    //   date={song.createdAt.toISOString()}
                                    date={format(song.createdAt)}
                                    imageUrl={song.imageUrl}
                                />
                            </>
                        )
                    })}
                    <div style={{ height: '2rem' }}></div>
                    <div style={{ height: '2rem' }}></div>
                    <div style={{ height: '2rem' }}></div>
                    <div style={{ height: '2rem' }}></div>
                </Box>
            </Flex>
            <Analytics />
            {/* <Player songs={data} /> */}
        </>
    )
}

export default Home
