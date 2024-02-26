import { useEffect } from 'react'
import { Flex, Box, Text } from 'rebass'
import Music from '../components/Music/Music'
import { css } from '@emotion/react'
//
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { Key } from '@mui/icons-material'
import Player from '@/components/Player/Player'
import { backgroundColor } from 'styled-system'
import { format } from 'timeago.js'
import SongTableTitle from '@/components/Music/SongTableTitle'

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
    imageUrl:string
}

function Home() {
    const data = useSelector((state: RootState) => state.songs.songs)

    const isLoading = useSelector(
        (state: RootState) => state.songs.getSongsLoading
    )
    const dispatch = useDispatch()
    const HomeStyle = css`
        width: 100%;
    `

    useEffect(() => {
        dispatch({ type: 'songs/fetchSongs' })
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    console.log(data)

    return (
        <>
            <Flex
                flexDirection={'column'}
                css={HomeStyle.styles}
                style={{ backgroundColor: '#0d1117' }}
            >
                <Box>
                    <Text fontSize={5} fontWeight="bold">
                        Songs
                    </Text>
                </Box>
                <Box>
                    <SongTableTitle />
                    {isLoading
                        ? 'Loading'
                        : data.map((song: Song) => {
                              return (
                                  <>
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
                                  </>
                              )
                          })}
                </Box>
            </Flex>
            {/* <Player songs={data} /> */}
        </>
    )
}

export default Home
