import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa6'
import { Box, Flex, Text } from 'rebass'

import Heart from 'react-heart'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import {
    pauseSong,
    playSong,
    setCurrentSong,
} from '../../state/player/PlayerSlice'

// import { likeSongStart } from '../../state/likedSongs/likedSongsSlice'
import {
    likeSongStart,
    likeSongSuccess,
    likeSongFailure,
} from '../../state/likedSongs/likedSongsSlice.ts'

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
    const [isLiked, setIsLiked] = useState(false)
    const user = useSelector((state: RootState) => state.user.user)
    //console.log(user)
    const isPlaying = useSelector((state: RootState) => state.player.isPlaying)
    const currentSong = useSelector(
        (state: RootState) => state.player.currentSong?.songUrl
    )
    const [previousPlayingState, setPreviousPlayingState] =
        useState<boolean>(false) // Store the previous playing state

    // console.log('_id:', _id) // Log the _id value
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
    // console.log(markedItem)

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
    const [active, setActive] = useState(false)
    const handleLike = () => {
        if (_id) {
            dispatch(likeSongStart(_id))
            setIsLiked(!isLiked)
            setActive(!active)
        }
    }

    // console.log(user._id)
    console.log(likes)
    useEffect(() => {
        setIsLiked(
            user._id ? likes?.includes(String(user._id)) || false : false
        )
    }, [likes])
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
                                <div style={{ width: '1rem' }}>
                                    <Heart
                                        isActive={isLiked}
                                        onClick={handleLike}
                                        animationTrigger="both"
                                        inactiveColor="rgba(255, 255, 255, 0.75)"
                                        activeColor="#1f6fd0"
                                        style={{ marginTop: '1rem' }}
                                        animationDuration={0.1}
                                    />
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
