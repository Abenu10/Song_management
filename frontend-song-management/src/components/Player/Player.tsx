import { setCurrentSong } from '../../state/player/PlayerSlice'
import { RootState } from '../../state/store'
import { useState, useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

interface PlayerProps {
    songs: Song[]
}

interface Song {
    _id: string
    artist: string
    title: string
    album: string
    genre: string
    songUrl: string
    userId: string
    likes: number
}
const Playercontainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
`
export default function Player({ songs }: PlayerProps) {
    const dispatch = useDispatch()
    const currentSongUrl = useSelector(
        (state: RootState) => state.player.currentSong?.songUrl
    )

    console.log('currentSongUrl', currentSongUrl)

    const currentSongTitle = useSelector(
        (state: RootState) => state.player.currentSong?.title
    )

    const [trackIndex, setTrackIndex] = useState(0)

    useEffect(() => {
        if (songs) {
            const index = songs.findIndex(
                (song) => song.songUrl === musicTracks[trackIndex].songUrl
            )
            if (index !== -1) {
                setTrackIndex(index)
            }
        }
    }, [songs])
    useEffect(() => {
        if (musicTracks[trackIndex]) {
            dispatch(setCurrentSong(musicTracks[trackIndex]))
        }
    }, [trackIndex])

    const musicTracks = songs
        ? songs.map((song) => ({
              title: song.title,
              songUrl: song.songUrl,
          }))
        : []

    const handleClickPrevious = () => {
        setTrackIndex((currentTrack) =>
            currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
        )
    }

    const handleClickNext = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
        )
    }

    return (
        <>
            <Playercontainer>
                {musicTracks[trackIndex] && (
                    <AudioPlayer
       j                 style={{
                            // borderRadius: '1rem',
                            background: 'rgba(1, 4, 9, 0.4)',
                            backdropFilter: 'blur(10px)',
                            // borderRadius: '10px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            // boxShadow: '0 8px 32px 0 rgba(31, 111, 208, 0.20)',
                            color: 'rgba(255, 0, 0, 0.75)',
                            height: '8rem',
                        }}
                        autoPlay
                        src={
                            currentSongUrl
                                ? currentSongUrl
                                : musicTracks[trackIndex].songUrl
                        }
                        onPlay={(e) => console.log('onPlay')}
                        showSkipControls={true}
                        showJumpControls={false}
                        header={`Now playing: ${
                            currentSongTitle
                                ? currentSongTitle
                                : musicTracks[trackIndex].title
                        }`}
                        footer="Muzika bet"
                        onClickPrevious={handleClickPrevious}
                        onClickNext={handleClickNext}
                        onEnded={handleClickNext}
                    />
                )}
            </Playercontainer>
        </>
    )
}
