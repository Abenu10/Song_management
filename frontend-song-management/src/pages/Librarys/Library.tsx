import React, { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Flex, Box, Text } from 'rebass'

import { format } from 'timeago.js'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { fetchLikedSongsStart } from '../../state/likedSongs/likedSongsSlice'
import Music from '../../components/Music/Music'
import SongTableTitle from '../../components/Music/SongTableTitle'

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

const Library = () => {
    const dispatch = useDispatch()
    const likedSongs = useSelector((state: RootState) => state.likedSongs.songs)

    useEffect(() => {
        dispatch(fetchLikedSongsStart())
    }, [dispatch])

    return (
        <>
            <Flex flexDirection={'column'}>
                <Box>
                    <Text fontSize={5} fontWeight="bold" mb={2}>
                        Your Library
                    </Text>
                </Box>

                <Box>
                    <SongTableTitle />
                    {likedSongs.map((song) => (
                        <Music
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
                    ))}
                </Box>
            </Flex>

            <Analytics />
        </>
    )
}

export default Library
