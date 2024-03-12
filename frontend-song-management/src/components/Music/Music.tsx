import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa6'
import { Box, Flex, Text } from 'rebass'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import {
    pauseSong,
    playSong,
    setCurrentSong,
} from '../../state/player/PlayerSlice'

import { likeSongStart } from '../../state/likedSongs/likedSongsSlice'

import {
    StyledOption,
    EditIcon,
    StyledRemoveIcon,
    Button,
    Button2,
    StyledButton,
    playTitle,
    boxStyle,
    hiddenOnSmallScreen,
    titleStyle,
    StyledOptionContainer,
    StyledlementsMenuebarContent,
    Overlay,
    ModalContent,
    formatDate,
    StyledSpan,
} from './Music.style'

import { format } from 'timeago.js'

import React, { useEffect, useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import SuccessToast from '../Toasts/SuccessToast'
import FailedToast from '../Toasts/FailedToast'

import EditSongModal from '../MultiStep/EditSongModal'
import SkeletonSong from './SkeletonSong'

type myComponentProp = {
    album: string
    artist: string
    genre?: string
    imageUrl?: string
    songUrl?: string
    date: string
    title: string
    _id?: string
    userId?: string
    likes?: string[]
}

const Music: React.FC<myComponentProp> = ({
    album,
    artist,
    genre,
    imageUrl,
    songUrl,
    date,
    title,
    _id,
    userId,
    likes,
}) => {
    const dispatch = useDispatch()

    const isPlaying = useSelector((state: RootState) => state.player.isPlaying)
    const currentSong = useSelector(
        (state: RootState) => state.player.currentSong?.songUrl
    )
    const [previousPlayingState, setPreviousPlayingState] =
        useState<boolean>(false) // Store the previous playing state

    console.log('_id:', _id) // Log the _id value
    console.log('song data:', {
        album,
        artist,
        genre,
        imageUrl,
        songUrl,
        date,
        title,
        _id,
        userId,
        likes,
    }) // Log the song data
    // console.log(title)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000) // 2 seconds

        return () => clearTimeout(timer) // cleanup on unmount
    }, [])

    const [open, setOpen] = useState(false)
    const [editSongId, setEditSongId] = useState<string | null>(null)
    const openEditModal = (songId: string | undefined) => {
        setEditSongId(songId ?? null)
        setModalOpen(true)
        setOptionIsOpened(false)
    }
    // Function to open modal
    const closeEditModal = () => setModalOpen(false) // Function to close modal
    // const openEditModal = () => setModalOpen(true) // Function to open modal
    const [modalOpen, setModalOpen] = useState(false) // State to manage modal visibility

    // FIXME: get the songs object state useselector
    const songs = useSelector((state: RootState) => state.songs.songs)

    const [optionIsOpened, setOptionIsOpened] = useState(false)
    const [markedItem, setMarkedItem] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const showSuccessToast = useSelector(
        (state: RootState) => state.songs.showSuccessToast
    )
    const showFailedToast = useSelector(
        (state: RootState) => state.songs.showFailedToast
    )

    // to open option
    const handleOptionClick = (e: any) => {
        e.stopPropagation()
        setOptionIsOpened((prev) => !prev)
    }

    const deleteSong = (id: string | unknown) => {
        dispatch({ type: 'song/deleteSongById', payload: { songid: id } })
        closeModal()
    }

    const openModal = () => {
        setOpenDeleteModal(true)
        setOptionIsOpened(false)
        setMarkedItem(true)
    }

    const closeModal = () => {
        setMarkedItem(false)
        setOpenDeleteModal(false)

        console.log('close')
    }
    console.log(markedItem)

    const StyledContent = styled.div`
        z-index: 10;
        font-size: 17px;
        position: absolute;
        min-width: 100px;
        background-color: #010101;
        box-shadow: 2px 2px 5px rgba(0, 0, 255, 0.1);
        border-radius: 10px;
        margin-right: 5px;
        display: ${optionIsOpened ? 'block' : 'none'};

        text-decoration: none;
        right: 0;
    `
    const spotifyStyle = css`
        width: 100%;
        color: #1f3044;
        padding: 4px 4px;
        border-radius: 8px;
        background-color: ${optionIsOpened ? '#161b22' : ''};

        &:hover {
            background-color: #161b22;
        }
        transition: all 0.1s ease;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    `
    const StyledBackGround = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        display: ${optionIsOpened ? 'block' : 'none'};
        height: 100vh;
        width: 100%;
    `

    const handlePlayPause = () => {
        if (isPlaying && currentSong === songUrl) {
            // Only set previous state if it was previously playing
            if (previousPlayingState) {
                setPreviousPlayingState(false)
            }
            dispatch(pauseSong())
        } else {
            setPreviousPlayingState(isPlaying) // Remember the previous state before playing
            dispatch(setCurrentSong({ title: title, songUrl: songUrl }))
            dispatch(playSong())
        }
    }
    const SongBox = styled(Box)`
        /* Add your desired song item styling here */
        background-color: #161b22;
        transition: background-color 0.3s ease-in-out;
        padding: 1rem;
        border-radius: 5px;
        cursor: pointer;
    `

    const handleLike = () => {
        if (_id) {
            dispatch(likeSongStart(_id))
        }
    }
    const isLiked = userId ? likes?.includes(userId) : false
    console.log(isLiked)
    return (
        <>
            {isLoading ? (
                // If the component is still loading, display a skeleton
                <SkeletonTheme baseColor="#39424e" highlightColor="#1f6fd0">
                    <div style={{ marginBottom: '6px' }}>
                        <SkeletonSong />
                    </div>
                </SkeletonTheme>
            ) : (
                <>
                    <div
                        onClick={handlePlayPause}
                        style={{ cursor: 'pointer' }}
                    >
                        {/* <SuccessToast isToastVisible={showSuccessToast} /> */}

                        <FailedToast isToastVisible={showFailedToast} />

                        {/* Render modal if isOpen is true */}
                        {openDeleteModal && (
                            <Overlay onClick={closeModal}>
                                <ModalContent
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Text fontSize={4} fontWeight={'bold'}>
                                        Delete from your Songs?
                                    </Text>
                                    <Text>
                                        This will delete{' '}
                                        <StyledSpan>{title}</StyledSpan> from
                                        Your Songs.
                                    </Text>
                                    <Flex
                                        flexDirection={'row'}
                                        justifyContent={'flex-end'}
                                        css={`
                                            gap: 10px;
                                            margin-top: 20px;
                                        `}
                                    >
                                        <Button2 onClick={closeModal}>
                                            Cancel
                                        </Button2>
                                        <Button onClick={() => deleteSong(_id)}>
                                            Delete
                                        </Button>
                                    </Flex>
                                </ModalContent>
                            </Overlay>
                        )}

                        <StyledBackGround
                            onClick={handleOptionClick}
                        ></StyledBackGround>

                        <Flex
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="space-between"
                            css={spotifyStyle.styles}
                        >
                            <Flex
                                flexDirection={'row'}
                                alignItems={'center'}
                                flex={1.5}
                                css={playTitle.styles}
                            >
                                <Box ml={2}>
                                    {isPlaying && currentSong === songUrl ? (
                                        <FaPause />
                                    ) : (
                                        <FaPlay />
                                    )}
                                </Box>
                                <Box>
                                    <img
                                        style={{
                                            width: '45px',
                                            height: '45px',
                                            borderRadius: '5px',
                                            objectFit: 'cover',
                                        }}
                                        src={
                                            imageUrl ||
                                            'https://res.cloudinary.com/dptx5wjus/image/upload/v1709624715/post-images/istockphoto-1351449908-1024x1024_w9jrty.jpg'
                                        }
                                    />
                                </Box>
                                <Flex
                                    flexDirection={'column'}
                                    justifyContent={'space-between'}
                                    css={titleStyle.styles}
                                >
                                    <Box>
                                        <Text fontSize={16} fontWeight="bold">
                                            {title || <Skeleton count={10} />}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text fontSize={14}>{artist}</Text>
                                    </Box>
                                </Flex>
                            </Flex>
                            <Box
                                css={[
                                    boxStyle.styles,
                                    hiddenOnSmallScreen.styles,
                                ]}
                                flex={1}
                                mr={2}
                            >
                                <Text
                                    fontSize={14}
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        marginLeft: '90px',
                                    }}
                                >
                                    {album || <Skeleton count={10} />}
                                </Text>
                            </Box>
                            <Box
                                css={[
                                    boxStyle.styles,
                                    hiddenOnSmallScreen.styles,
                                ]}
                                flex={1}
                            >
                                <Text
                                    fontSize={14}
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        marginLeft: '90px',
                                    }}
                                >
                                    {date || <Skeleton count={10} />}
                                </Text>
                            </Box>
                            <Box
                                style={{
                                    cursor: 'pointer',
                                    marginRight: '30px',
                                }}
                            >
                                <div
                                    onClick={handleLike}
                                    style={{
                                        // backgroundColor: 'red',
                                        width: '20px',
                                        height: '20px',
                                    }}
                                >
                                    {isLiked ? (
                                        <svg
                                            stroke="currentColor"
                                            fill="#1f6fd0"
                                            stroke-width="0"
                                            viewBox="0 0 1024 1024"
                                            height="1.6em"
                                            width="1.6em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z"></path>
                                        </svg>
                                    ) : (
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 1024 1024"
                                            height="1.6em"
                                            width="1.6em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path>
                                        </svg>
                                    )}
                                </div>
                            </Box>
                            <Box css={StyledOptionContainer.styles}>
                                <StyledOption onClick={handleOptionClick} />
                                {optionIsOpened === true ? (
                                    <StyledContent
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div
                                            onClick={openEditModal}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#1f3044',
                                            }}
                                        >
                                            <Flex
                                                flexDirection={'row'}
                                                alignItems={'center'}
                                                p={2}
                                                css={
                                                    StyledlementsMenuebarContent.styles
                                                }
                                            >
                                                <Box>
                                                    <EditIcon />
                                                </Box>

                                                <Box>
                                                    <StyledButton
                                                        onClick={() =>
                                                            _id
                                                                ? openEditModal(
                                                                      _id
                                                                  )
                                                                : null
                                                        }
                                                    >
                                                        Edit
                                                    </StyledButton>
                                                </Box>
                                            </Flex>
                                        </div>
                                        <Flex
                                            flexDirection={'row'}
                                            alignItems={'center'}
                                            p={2}
                                            css={
                                                StyledlementsMenuebarContent.styles
                                            }
                                            onClick={(e) => openModal(e)}
                                        >
                                            <Box>
                                                <StyledRemoveIcon />
                                            </Box>
                                            <Box>
                                                <StyledButton>
                                                    Remove
                                                </StyledButton>
                                            </Box>
                                        </Flex>
                                    </StyledContent>
                                ) : (
                                    ''
                                )}
                            </Box>
                            <EditSongModal
                                songId={{ _id }}
                                isOpen={modalOpen}
                                onClose={closeEditModal}
                            />{' '}
                        </Flex>
                    </div>
                </>
            )}
        </>
    )
}

export default Music
//
